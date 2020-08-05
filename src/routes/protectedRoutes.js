import React from "react";
import Payout from "../components/dashboardComponents/payout/payout";
import Dashboard from "../components/dashboardComponents/dashboard/dashboard";
import Hunts from "../components/dashboardComponents/hunts/hunts";
import Invitations from "../components/dashboardComponents/invitations/invitations";
import Characters from "../components/dashboardComponents/characters/characters";
import Character from "../components/dashboardComponents/characters/character";
import AddCharacter from "../components/dashboardComponents/characters/addCharacter";
import Parties from "../components/dashboardComponents/party/parties";
import Party from "../components/dashboardComponents/party/party";
import AddParty from "../components/dashboardComponents/party/addParty";
import Spawns from "../components/dashboardComponents/spawns/spawns";
import AddSpawn from "../components/dashboardComponents/spawns/addSpawn";

import { Layout as dashboardLayout } from "../components/layouts/dashboard/dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

const protectedRoutes = [
  {
    path: "/dashboard/add-spawn",
    layout: dashboardLayout,
    component: AddSpawn,
  },

  {
    path: "/dashboard/payout",
    layout: dashboardLayout,
    component: Payout,
  },

  {
    path: "/dashboard/spawns",
    layout: dashboardLayout,
    component: Spawns,
  },

  {
    path: "/dashboard/hunts/:partyId",
    layout: dashboardLayout,
    component: Hunts,
  },

  {
    path: "/dashboard/parties/add-party",
    layout: dashboardLayout,
    component: AddParty,
  },

  {
    path: "/dashboard/parties/:id",
    layout: dashboardLayout,
    component: Party,
  },

  {
    path: "/dashboard/characters/add-character",
    layout: dashboardLayout,
    component: AddCharacter,
  },

  {
    path: "/dashboard/parties",
    layout: dashboardLayout,
    component: Parties,
  },

  {
    path: "/dashboard/characters/:id",
    layout: dashboardLayout,
    component: Character,
  },

  {
    path: "/dashboard/characters",
    layout: dashboardLayout,
    component: Characters,
  },

  {
    path: "/dashboard/invitations",
    layout: dashboardLayout,
    component: Invitations,
  },

  { path: "/dashboard", layout: dashboardLayout, component: Dashboard },
];

export const setProtectedRoutes = () => {
  return protectedRoutes.map((r) => {
    return (
      <ProtectedRoute
        key={r.path}
        path={r.path}
        component={r.component}
        layout={r.layout}
        exact={r.exact}
      />
    );
  });
};
