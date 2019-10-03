import React from 'react';

export default {
  register: {
    create: {
      info: (
    <p>
      Je veux créer mon équipe pour pouvoir rejoindre un tournoi.
      <br/>
      Je serai chef d'équipe et je pourrai gérer les membres de mon équipe.
    </p>),
      discord: (<p>Il te manque un ou plusieurs joueurs? Viens recruter sur notre discord!</p>),
      },
    join: (
    <p>
      Je veux rejoindre une équipe déjà créée pour un tournoi.
      <br/>
      Le chef d'équipe devra accepter ma demande.
    </p>
    ),
    solo: (<p>Je veux rejoindre un tournoi solo (SSBU, Libre ou OSU)</p>),
  },
};