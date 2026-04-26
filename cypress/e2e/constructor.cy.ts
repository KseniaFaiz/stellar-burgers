describe('конструктор бургера', () => {
    beforeEach(() => {
        cy.fixture('ingredients.json').then((ingredients) => {
            cy.intercept('GET', '**/ingredients', ingredients).as('ingredients');
        });

        cy.visit('/');
        cy.wait('@ingredients', { timeout: 20000 });
    });

    it('добавляет булку и начинку в конструктор', () => {
        cy.contains('Булка тестовая').parents('li').within(() => {
            cy.contains('Добавить').click();
        });

        cy.contains('Начинка тестовая').parents('li').within(() => {
            cy.contains('Добавить').click();
        });

        cy.contains('Булка тестовая (верх)').should('exist');
        cy.contains('Булка тестовая (низ)').should('exist');
        cy.contains('Начинка тестовая').should('exist');
    });

    it('открывает и закрывает модальное окно ингредиента (крестик и оверлей)', () => {
        cy.contains('Начинка тестовая').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.contains('Начинка тестовая').should('exist');

        cy.get('[data-testid="modal-close"]').click();
        cy.contains('Детали ингредиента').should('not.exist');

        cy.contains('Соус тестовый').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get('[data-testid="modal-overlay"]').click({ force: true });
        cy.contains('Детали ингредиента').should('not.exist');
    });

    it('создаёт заказ, показывает номер, закрывает модалку и очищает конструктор', () => {
        const userResponse = {
            success: true,
            user: { email: 'test@test.ru', name: 'Test' }
        };

        const orderResponse = {
            success: true,
            name: 'test order',
            order: {
                _id: 'order-id',
                status: 'done',
                name: 'Заказ',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                number: 12345,
                price: 160
            }
        };

        cy.intercept('GET', '**/auth/user', userResponse).as('user');
        cy.intercept('POST', '**/orders', (req) => {
            expect(req.body).to.have.property('ingredients');
            req.reply(orderResponse);
        }).as('order');

        cy.setCookie('accessToken', 'Bearer test-access-token');
        cy.visit('/', {
            onBeforeLoad(win) {
                win.localStorage.setItem('refreshToken', 'test-refresh-token');
            }
        });
        cy.wait('@ingredients', { timeout: 20000 });

        cy.wait('@user', { timeout: 20000 });

        cy.contains('Булка тестовая').parents('li').within(() => {
            cy.contains('Добавить').click();
        });

        cy.contains('Начинка тестовая').parents('li').within(() => {
            cy.contains('Добавить').click();
        });

        cy.contains('Оформить заказ').click();
        cy.wait('@order', { timeout: 20000 });

        cy.get('[data-testid="modal"]').within(() => {
            cy.contains('12345').should('exist');
        });

        cy.get('[data-testid="modal-close"]').click();
        cy.get('[data-testid="modal"]').should('not.exist');

        cy.contains('Выберите булки').should('exist');
        cy.contains('Выберите начинку').should('exist');
    });
});