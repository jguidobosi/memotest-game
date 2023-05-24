const URL = '127.0.0.1:8080';

context('Memotest', () => {

  describe('juega al memotest', () => {

    it('Se asegura de que haya 16 cuadrados disponibles', () => {
      cy.visit(URL);
      cy.get('#gameboard').find('.square').should('have.class', "available");
    })

    it('se asegura que los cuadros sean aleatorios', () => {
      cy.visit(URL);
      cy.get('.square').then((squares) => {
        let originalClases = [];
        squares.each(function (i, square) {
          originalClases.push(square.className);
        });
        cy.visit(URL);
        cy.get('.square').then((squares) => {
          let newClases = [];
          squares.each(function (i, square) {
            originalClases.push(square.className);
          });
          cy.wrap(originalClases).should('not.deep.equal', newClases);
        });
      });
    });

    it("Elije pares erróneo", () => {
      cy.visit(URL);
      cy.get('.square').then((squares) => {
        for (let i = 0; i <= 3; i++) {
          let j = i + 1;
          while (squares[i].className == squares[j].className) {
            j++
          }
          cy.wait(500).then(() => squares[i].click());
          cy.wait(500).then(() => squares[j].click());
        }
        cy.get('#gameboard').find('.available').should('have.length.of', 16);
      });
    });

    it('Resuelve el juego', () => {
      cy.visit(URL);
      function clickPair(color) {
        cy.get(color).then((squares) => {
          squares.each((i, square) => {
            console.log(square);
            cy.wait(300).then(() => square.click());
          });
        });
      }

      clickPair(".blue");
      clickPair(".purple");
      clickPair(".green");
      clickPair(".light-blue");
      clickPair(".orange");
      clickPair(".pink");
      clickPair(".red");
      clickPair(".yellow");

      cy.get('.ending').
        should('be.visible').
        contains(
          "GOOD JOB PIRATE! Took you 8 shots",
        );

      cy.get(".end-button").then((button) => button.click());

      cy.get('.ending').should('not.be.visible')
      

    });

  });
});
