describe('Form app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    });

    it('sanity test', () => {
        expect(1 + 2).to.equal(3);
    })

    it('tests that you can add text', () => {
        cy.get('input[name="name"]')
        .type("here is a name")
        .should("have.value", "here is a name");
    })

    it('tests that you can select multiple toppings', () => {
        cy.get('input[name="tomatoSauce"]')
          .should('not.have.checked')
          .click()
          .should('have.checked')
        cy.get('input[name="whiteSauce"]')
          .should('not.have.checked')
          .click()
          .should('have.checked')
        cy.get('input[name="pepperoni"]')
          .should('not.have.checked')
          .click()
          .should('have.checked')  
    })

    it('tests that you can submit the form', () => {
        cy.get('input[name="name"]').type("here is a name")
        cy.get('select[name="size"]').select('Small')
        cy.get('input[name="name"]').type("here is a name")
        cy.get('button').click();
    })
})