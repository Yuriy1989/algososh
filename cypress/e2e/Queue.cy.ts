import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

const stringTest_1 = "test"
const stringTest_2 = "tset"

describe('Очередь', () => {
  beforeEach('', () => {
    cy.visit('/queue')
  })

  it('Проверка, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input[name="text"]').should('have.value', '')
    cy.get('div[class^="queue_button"]>button:first-child').should('be.disabled')
  })

  it('Проверка, правильность добавления элемента в очередь. Курсоры head и tail отрисовываются корректно.', () => {
    cy.get('input[name="text"]').type(stringTest_1).should('have.value', stringTest_1)
    cy.get('div[class^="queue_button"]>button:first-child').click()

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('div[class^="queue_circle"]>div:first-child').contains('head')
    cy.get('div[class^="queue_circle"]>div:first-child').contains('tail');
    cy.get('div[class^="queue_circle"]>div:first-child').contains(stringTest_1);
    cy.get('input[name="text"]').type(stringTest_2).should('have.value', stringTest_2)
    cy.get('div[class^="queue_button"]>button:first-child').click()

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('div[class^="queue_circle"]>div:first-child').contains('head')
    cy.get('div[class^="queue_circle"]>div:first-child>div:nth-child(4)').should('be.empty')
    cy.get('div[class^="queue_circle"]>div:first-child').contains(stringTest_1);
    cy.get('div[class^="queue_circle"]>div:nth-child(2)>div:first-child').should('be.empty')
    cy.get('div[class^="queue_circle"]>div:nth-child(2)').contains('tail');
    cy.get('div[class^="queue_circle"]>div:nth-child(2)').contains(stringTest_2);
  })

  it('Проверка правильности удаления элемента из очереди.', () => {
    cy.get('input[name="text"]').type(stringTest_1).should('have.value', stringTest_1)
    cy.get('div[class^="queue_button"]>button:first-child').click()
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('input[name="text"]').type(stringTest_2).should('have.value', stringTest_2)
    cy.get('div[class^="queue_button"]>button:first-child').click()
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('div[class^="queue_button"]>button:nth-child(2)').click()
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('div[class^="queue_circle"]>div:first-child>div:nth-child(4)').should('be.empty')
    cy.get('div[class^="queue_circle"]>div:first-child>div:first-child').should('be.empty')
    cy.get('div[class^="queue_circle"]>div:first-child>div:nth-child(2)>p').should('be.empty')

    cy.get('div[class^="queue_circle"]>div:nth-child(2)').contains('head');
    cy.get('div[class^="queue_circle"]>div:nth-child(2)').contains('tail');
    cy.get('div[class^="queue_circle"]>div:nth-child(2)').contains(stringTest_2);
  })

  it('Проверка поведение кнопки «Очистить».', () => {
    cy.get('input[name="text"]').type(stringTest_1).should('have.value', stringTest_1)
    cy.get('div[class^="queue_button"]>button:first-child').click()
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('input[name="text"]').type(stringTest_2).should('have.value', stringTest_2)
    cy.get('div[class^="queue_button"]>button:first-child').click()
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('form>button').click()
    cy.wait(SHORT_DELAY_IN_MS);
    for(let i = 1; i <= 7; i++) {
      cy.get('div[class^="queue_circle"]>div:nth-child('+i+')>div:nth-child(4)').should('be.empty')
      cy.get('div[class^="queue_circle"]>div:nth-child('+i+')>div:first-child').should('be.empty')
      cy.get('div[class^="queue_circle"]>div:nth-child('+i+')>div:nth-child(2)>p').should('be.empty')
    }
  })
  
})
