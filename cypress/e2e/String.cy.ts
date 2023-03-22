describe('Строка', () => {
  beforeEach(() => {
    cy.visit('/recursion')
  })

  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input[name="text"]').should('have.value', '')
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('Проверьте, что строка разворачивается корректно', () => {
    cy.get('input[name="text"]').type('12345').should('have.value', '12345')
    cy.get('button[type="submit"]').click()
    cy.get('input[name="text"]').should('have.value', '')
    cy.get('button[type="submit"]').should('be.disabled')

    cy.get('div').should('have.class', /text_/)
    expect('div').to.match(/text_/)
  })
})
