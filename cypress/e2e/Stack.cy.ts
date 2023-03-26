import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';


describe('Стек', () => {
  beforeEach(() => {
    cy.visit('/stack')
  })

  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input[name="text"]').should('have.value', '')
    cy.get('div[class^="stack_button"]>button:first-child').should('be.disabled')
  })

  it('Проверьте правильность добавления элемента в стек. Важно убедиться, что цвета элементов меняются и каждый шаг анимации отрабатывает корректно', () => {
    
  })

})
