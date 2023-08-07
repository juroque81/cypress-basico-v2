/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
      cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
  
    it('preenche os campos obrigatórios e envia o formulário', function() {
      const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
      cy.get('#firstName').type('Juliana')
      cy.get('#lastName').type('Roque')
      cy.get('#email').type('teste@teste.com.br')
      cy.get('#open-text-area').type(longText, { delay: 0})
    //  cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()
      
      cy.get('.success').should('be.visible')
    })
  
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
      cy.get('#firstName').type('Juliana')
      cy.get('#lastName').type('Roque')
      cy.get('#email').type('teste1teste.com.br')
      cy.get('#open-text-area').type('Teste')
      //cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()
      
      cy.get('.error').should('be.visible')
    })
  
    it('campo telefone continua vazio quando preenchido com valor não numérico', function() {
      cy.get('#phone')
        .type('AAAAA')
        .should('have.value', '')
    })
  
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
      cy.get('#firstName').type('Juliana')
      cy.get('#lastName').type('Roque')
      cy.get('#email').type('teste@teste.com.br')
      cy.get('#open-text-area').type('Teste')
      cy.get('#phone-checkbox').click()
      //cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()
      
      cy.get('.error').should('be.visible')
    })
  
    it('preenche e limpa os campos obrigatórios', function() {
      cy.get('#firstName')
        .type('Juliana')
        .should('have.value', 'Juliana')
        .clear()
        .should('have.value', '')
      cy.get('#lastName')
        .type('Roque')
        .should('have.value', 'Roque')
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('teste@teste.com.br')
        .should('have.value', 'teste@teste.com.br')
        .clear()
        .should('have.value', '')
      cy.get('#phone')
        .type('555133445566')
        .type('teste@teste.com.br')
        .should('have.value', '555133445566')
        .clear()
        .should('have.value', '')
    })
  
    it('preenche e limpa os campos obrigatórios', function() {
      //cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })
  
    it('envia o formulário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
    })
  
    it('seleciona um produto (YouTube) por seu texto', function() {
      cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })
  
    it('seleciona um produto (Mentoria) por seu valor', function() {
      cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })
  
    it('seleciona um produto (Blog) por seu índice', function() {
      cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })
  
    it('marca o tipo de atendimento "Feedback"', function() {
      //cy.get('#support-type > :nth-child(4)')
      cy.get('input[type="radio"][value="feedback"]')
        .check()      
        .should('have.value', 'feedback')
    })
  
    it('marca cada tipo de atendimento', function() {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })
  
    it('marca ambos checkboxes, depois desmarca o último', function() {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
  
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
      cy.get('#firstName').type('Juliana')
      cy.get('#lastName').type('Roque')
      cy.get('#email').type('teste@teste.com.br')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()
  
      cy.get('.error').should('be.visible')
    })
  
    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
          //console.log($input)
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
  
    it('seleciona um arquivo simulando drag-and-drop', function(){
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input){
          //console.log($input)
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
  
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
  
    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
  
    it('acessa a páginna da politica de privacidade removendo o target e então clicando no lik', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
  
        cy.contains('Talking About Testing').should('be.visible')
    })
  
  })