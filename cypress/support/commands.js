Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Juliana')
    cy.get('#lastName').type('Roque')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#open-text-area').type("Teste")
    cy.contains('button', 'Enviar').click()
})