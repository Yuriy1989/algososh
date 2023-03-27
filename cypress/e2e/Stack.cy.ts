import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

const stringTest_1 = "test"
const stringTest_2 = "tset"

describe('Стек', () => {
  beforeEach(() => {
    cy.visit('/stack')
  })

  it('Проверка, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input[name="text"]').should('have.value', '')
    cy.get('div[class^="stack_button"]>button:first-child').should('be.disabled')
  })

  it('Проверка правильности добавления элемента в стек. Важно убедиться, что цвета элементов меняются и каждый шаг анимации отрабатывает корректно', () => {
    cy.get('input[name="text"]').type(stringTest_1).should('have.value', stringTest_1)
    cy.get('div[class^="stack_button"]>button:first-child').click()
    cy.get('div[class^="circle_content"]>div:nth-child(2)').contains(stringTest_1)
    cy.get('div[class^="circle_content"]>div:first-child').contains('top')
    cy.get('div[class^="circle_content"]>div:nth-child(2)')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))

    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('div[class^="circle_content"]>div:nth-child(2)')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))

    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('input[name="text"]').type(stringTest_2).should('have.value', stringTest_2)
    cy.get('div[class^="stack_button"]>button:first-child').click()
    cy.get('div[class^="circle_content"]>div:nth-child(2)').contains(stringTest_2)
    cy.get('div[class^="circle_content"]:first-child>div:first-child').should('be.empty')
    cy.get('div[class^="circle_content"]:nth-child(2)>div:first-child').should('have.text', 'top')
    cy.get('div[class^="circle_content"]:nth-child(2)>div:nth-child(2)')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_changing'))

    cy.wait(SHORT_DELAY_IN_MS)
    cy.get('div[class^="circle_content"]:nth-child(2)>div:nth-child(2)')
      .invoke('attr', 'class')
      .then(classList => expect(classList).contains('circle_default'))
  })

  it('Проверка правильности удаления элемента из стека.', () => {
    cy.get('input[name="text"]').type(stringTest_1).should('have.value', stringTest_1)
    cy.get('div[class^="stack_button"]>button:first-child').click();
    cy.get('div[class^="stack_button"]>button:nth-child(2)').click();
    cy.get('div[class^="circle_content"]').should('not.exist')
    cy.wait(SHORT_DELAY_IN_MS)
  })

  it('Проверка поведение кнопки «Очистить». Добавление в стек несколько элементов, а по нажатию на кнопку «Очистить» длина стека должна быть равна 0.', () => {
    cy.get('input[name="text"]').type(stringTest_1).should('have.value', stringTest_1)
    cy.get('div[class^="stack_button"]>button:first-child').click();
    cy.get('div[class^="stack_button"]>button:nth-child(2)').click();
    cy.get('div[class^="circle_content"]').should('not.exist')
    cy.wait(SHORT_DELAY_IN_MS)
  })

})
