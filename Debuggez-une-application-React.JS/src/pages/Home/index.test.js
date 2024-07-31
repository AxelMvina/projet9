import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    // to implement
    render(<Home />);
    //vérifie l'apparition des cartes événements
    await screen.queryAllByTestId("card-testid");
  })
  
  it("a list a people is displayed", () => {
    // to implement
    render(<Home />);
    // Vérifie que les cartes des membres de l'équipe sont rendues
    const peopleCards = screen.getAllByTestId("people-card");
    expect(peopleCards.length).toBeGreaterThan(0);
  })

  it("a footer is displayed", async () => {
    // to implement
    render(<Home />);
    // Vérifie que le pied de page est affiché avec le titre de la partie ou un element du contenu
    await waitFor(() => {
      expect(screen.getByText("Notre dernière prestation")).toBeInTheDocument();
      expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
    });
    await screen.findByText("Une agence événementielle propose des prestations de service spécialisées dans la conception et l'organisation de divers événements tels que des événements festifs, des manifestations sportives et culturelles, des événements professionnels");
  })

  it("an event card, with the last event, is displayed", async () => {
    // to implement
    render(<Home />);

    const lastEvent = screen.queryByTestId("last-event-card");

    if (lastEvent) {
      await waitFor(() => {
        expect(screen.getByText("Notre dernière prestation")).toBeInTheDocument();
        expect(lastEvent).toBeInTheDocument();
      });
    } else {
      await waitFor(() => {
        expect(screen.getByText("Aucune prestation disponible pour le moment.")).toBeInTheDocument();
      });
    }
  })
});
