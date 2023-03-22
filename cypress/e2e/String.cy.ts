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

    const t = cy.get('*[class^="circle_circle"]')
    console.log("tttttt = ", t)
    t.each((item, index) => {
      console.log("item = ", item)
      item[0].contains('circle_default')
      cy.get('item[0]').contains('have.class', 'circle_default')
    })
  })
})
