describe('Тестирование работоспособности приложения', () => {
  it('приложение поднялось', () => {
    cy.visit('/')
  })

  it('тестирование переходов по страницам работает', () => {
    cy.visit('/recursion')
    cy.get('h3').should('have.text', 'Строка')
    cy.visit('/fibonacci')
    cy.get('h3').should('have.text', 'Последовательность Фибоначчи')
    cy.visit('/sorting')
    cy.get('h3').should('have.text', 'Сортировка массива')
    cy.visit('/stack')
    cy.get('h3').should('have.text', 'Стек')
    cy.visit('/queue')
    cy.get('h3').should('have.text', 'Очередь')
    cy.visit('/list')
    cy.get('h3').should('have.text', 'Связный список')
  })


})
