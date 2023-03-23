import { DELAY_IN_MS } from '../../src/constants/delays';
import { permutation } from "../../src/utils/algorithms/string";

const stringTest = '12345';
const newMas = permutation(stringTest.split(''));
console.log("newMas", newMas);

describe('Строка', () => {
  beforeEach(() => {
    cy.visit('/recursion')
  })

  it('Проверьте, что если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input[name="text"]').should('have.value', '')
    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('Проверьте, что строка разворачивается корректно', () => {
    cy.get('input[name="text"]').type('12345').should('have.value', stringTest)
    cy.get('button[type="submit"]').click()
    cy.get('input[name="text"]').should('have.value', '')
    cy.get('button[type="submit"]').should('be.disabled')

    // const elements = cy.get('*[class^="circle_circle"]')
    // console.log("elements", elements);

    let i = 0;
    while (i < newMas.length) {
      const elements = cy.get('*[class^="circle_circle"]')
      elements.each((item, index) => {
        // if (index === newMas[i].)
        console.log("index", index);
        cy.wrap(item)
          .invoke('attr', 'class')
          .then(classList => expect(classList).contains('circle_default'))
      })

      // elements.each((item) => {
      //   cy.wrap(item)
      //   .invoke('attr', 'class')
      //   .then(classList => expect(classList).contains('circle_default'))
      // })
      // cy.wait(DELAY_IN_MS)

      i++;
    }

    // elements.each((item) => {
    //   cy.wrap(item)
    //   .invoke('attr', 'class')
		// 	.then(classList => expect(classList).contains('circle_default'))
    // })

    // cy.wait(DELAY_IN_MS)

    // elements.each((item, index) => {
    //   console.log("item" , item.length);
    //   if(index === 0 || index === stringTest.length-1){
    //     cy.wrap(item)
    //     .invoke('attr', 'class')
    //     .then(classList => expect(classList).contains('circle_changing'))
    //   }
    // })

  })
})
