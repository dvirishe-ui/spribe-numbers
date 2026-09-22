/**
 * External reference material shared by the SPRIBE team for this
 * partnership. These correspond to guides on the SPRIBE support portal
 * (support.spribe.co) — titles and descriptions are per the operator's
 * own labeling of each link.
 */
export interface PromoAssetLink {
  title: string;
  type: "Docs" | "Google Doc" | "Drive file";
  url: string;
  description: string;
}

export const PROMOTIONAL_ASSET_LINKS: PromoAssetLink[] = [
  {
    title: "Games Integration Overview",
    type: "Docs",
    url: "https://docs.spribe.io/games-integration/overview",
    description:
      "SPRIBE's public developer documentation — the technical overview for integrating SPRIBE games into an operator's platform.",
  },
  {
    title: "Aviator Chat | User Guide",
    type: "Google Doc",
    url: "https://docs.google.com/document/d/1c8uchFA2l3Py5KvmK4iQrau2G-sShNDjGvIiVa7sACI/edit?tab=t.0#heading=h.ugtjlmv1x8fk",
    description: "Guide to enabling and configuring in-game chat for Aviator.",
  },
  {
    title: "Aviator Widgets | Guide",
    type: "Drive file",
    url: "https://drive.google.com/file/d/12Q5MKaaAdNZxF1OCjLOTyd1hQ_cASRLd/edit",
    description: "Guide to the in-game widgets available for the Aviator client.",
  },
  {
    title: "Freebet Promo | Guide",
    type: "Google Doc",
    url: "https://docs.google.com/document/d/15roYtStEEvaFNQFYmnvd1Df_Va5enZEHMrHMbnD-i80/edit?tab=t.0#heading=h.ugtjlmv1x8fk",
    description: "Guide to setting up a Freebet Promo campaign.",
  },
  {
    title: "Player Groups in Client Area | Guide",
    type: "Drive file",
    url: "https://drive.google.com/file/d/1Aj0I2Eb4EWva952CjUdaifW9MVeBhb5t/view",
    description: "Guide to managing player groups from the Client Area for targeted promotions.",
  },
  {
    title: "Aviator Freebets | Guide",
    type: "Drive file",
    url: "https://drive.google.com/file/d/1CHmj3DwREkWz5TVwU8EOyNv-QS_0g_rg/view",
    description: "Guide to the Aviator Freebets mechanic.",
  },
  {
    title: "Rain Promo Free Bets | Guide",
    type: "Drive file",
    url: "https://drive.google.com/file/d/1shhqe6KMHiW2Wp8ILzkde3GWInbmUi7a/view",
    description: "Guide to creating a Rain Promo Free Bets campaign.",
  },
  {
    title: "Aviator Challenges | Guide",
    type: "Drive file",
    url: "https://drive.google.com/file/d/1BC-TAeaCd9cpp-Rz7B2jHNiAZ0QxiPKI/view",
    description: "Guide to setting up Aviator Challenges.",
  },
  {
    title: "Cross Game Challenges | Guide",
    type: "Drive file",
    url: "https://drive.google.com/file/d/1ZaAkjr9zu6037TmnfF4aL1YLv3C5h_XM/edit",
    description: "Guide to setting up a Cross Game Challenges campaign.",
  },
  {
    title: "Player Groups | Private API Guide",
    type: "Drive file",
    url: "https://drive.google.com/file/d/1ox55DKgjc2aaoGQLFqwzqbDeUI5Zu3qY/view",
    description: "Private API guide for managing player groups programmatically.",
  },
];
