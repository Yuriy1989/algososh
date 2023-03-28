import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

const stringTest_1 = "test"

describe('Список', () => {
  beforeEach(() => {
    cy.visit('/list')
  })

  it('Проверка, что если в инпутах пусто, то кнопка добавления и удаления по индексу недоступны', () => {
    cy.get('input[name="text"]').should('have.value', '')
    cy.get('input[name="index"]').should('have.value', '')
    cy.get('div[class^="list_button"]>button:first-child').should('be.disabled')
    cy.get('div[class^="list_button"]>button:nth-child(2)').should('be.disabled')
    cy.get('div[class^="list_formIndex"]>button:nth-child(2)').should('be.disabled')
    cy.get('div[class^="list_formIndex"]>button:nth-child(3)').should('be.disabled')
  })

  it('Проверьте корректность отрисовки дефолтного списка', () => {

  })

})
