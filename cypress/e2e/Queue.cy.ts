import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Очередь', () => {
  beforeEach('', () => {
    cy.visit('/queue')
  })

  it('Проверка, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input[name="text"]').should('have.value', '')
    cy.get('div[class^="queue_button"]>button:first-child').should('be.disabled')
  })
})
