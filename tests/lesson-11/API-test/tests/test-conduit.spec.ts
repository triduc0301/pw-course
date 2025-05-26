import { test, expect } from '@playwright/test';

test.describe("Conduit web", async () => {
    const BASE_URL: string = "https://conduit-api.bondaracademy.com";
    function randomUsername() {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let name = '';
        for (let i = 0; i < 8; i++) {
            name += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return name;
    }
    const username = randomUsername();
    const email = `${username}@gmail.com`;
    const password = "12345678";
    const article = {
        title: "API in playwright",
        description: "How to use Playwright to create article",
        body: "How to use Playwright to create article",
        tagList: [
            "Playwright Viet Nam",
            "pw",
            "pw-k14"
        ]
    }

    const articleUpdate = {
        title: "API in playwright - updated",
        description: "How to use Playwright to create article and update article",
    }

    let token: string = "";
    let slugID: string = "";
    const endpointArticle: string = "api/articles";
    const commentDel = ["Comment 02", "Comment 05"];
    let commentIdDel: number[] = [];

    test("Register", async ({ request }) => {
        const endpoint = "api/users";
        const resp = await request.post(`${BASE_URL}/${endpoint}`, {
            data: {
                'user': {
                    'email': email,
                    'password': password,
                    'username': username
                }
            }
        });

        const dataResp = await resp.json();
        expect(resp.status()).toBe(201);
        expect(dataResp['user']['username']).toBe(username);
        expect(dataResp['user']['email']).toBe(email);
    })


    test("Login and create article", async ({ request }) => {
        await test.step("Login", async () => {
            const endpoint = "api/users/login";
            const resp = await request.post(`${BASE_URL}/${endpoint}`, {
                data: {
                    'user': {
                        'email': email,
                        'password': password
                    }
                }
            });
            expect(resp.status()).toBe(200);

            const dataResp = await resp.json();
            token = dataResp['user']['token'];

            expect(dataResp['user']['username']).toBe(username);
            expect(dataResp['user']['email']).toBe(email);
        })

        await test.step("Create Article", async () => {
            const resp = await request.post(`${BASE_URL}/${endpointArticle}`, {
                data: {
                    'article': {
                        "title": "API in playwright",
                        "description": "How to use Playwright to create article",
                        "body": "How to use Playwright to create article",
                        "tagList": [
                            "Playwright Việt Nam",
                            "pw",
                            "pw-k14"
                        ]
                    }
                },
                headers: {
                    Authorization: `Token ${token}`
                }
            });

            expect(resp.status()).toBe(201);

            const dataResp = await resp.json();
            slugID = dataResp['article']['slug'];

            expect(dataResp['article']['author']['username']).toBe(username);
            expect(dataResp['article']['title']).toBe(article.title);
            expect(dataResp['article']['description']).toBe(article.description);

            for (let tag of article.tagList) {
                expect(dataResp['article']['tagList']).toContain(tag);
            }
        })
    })

    test("Add comment", async ({ request }) => {
        for (let i = 1; i <= 5; i++) {
            const resp = await request.post(`${BASE_URL}/${endpointArticle}/${slugID}/comments`, {
                data: {
                    'comment': {
                        'body': `Comment 0${i}`
                    }
                },
                headers: {
                    Authorization: `Token ${token}`
                }
            })

            expect(resp.status()).toBe(200);

            const dataResp = await resp.json();

            expect(dataResp['comment']['author']['username']).toBe(username);
            expect(dataResp['comment']['body']).toBe(`Comment 0${i}`);

            if (commentDel.includes(dataResp['comment']['body'])) {
                commentIdDel.push(dataResp['comment']['id'])
            }
        }
    })

    test("Delete comment", async ({ request }) => {
        for (let id of commentIdDel) {
            const resp = await request.delete(`${BASE_URL}/${endpointArticle}/${slugID}/comments/${id}`, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            expect(resp.status()).toBe(200);
        }
    })

    test("Update article", async ({ request }) => {
        const resp = await request.put(`${BASE_URL}/${endpointArticle}/${slugID}`, {
            data: {
                "article": {
                    "title": articleUpdate.title,
                    "description": articleUpdate.description,
                    "body": "How to use Playwright to create article",
                    "tagList": [
                        "pw",
                        "Playwright Viet Nam",
                        "pw-k14"
                    ],
                    "slug": "API-in-playwright-27075"
                }
            },
            headers: {
                Authorization: `Token ${token}`
            }
        })

        expect(resp.status()).toBe(200);

        const respData = await resp.json();
        slugID = respData['article']['slug'];
        expect(respData['article']['title']).toBe(articleUpdate.title);
        expect(respData['article']['description']).toBe(articleUpdate.description);
    })

    test("Delete article", async ({ request }) => {
        const resp = await request.delete(`${BASE_URL}/${endpointArticle}/${slugID}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        expect(resp.status()).toBe(204);
    })
})