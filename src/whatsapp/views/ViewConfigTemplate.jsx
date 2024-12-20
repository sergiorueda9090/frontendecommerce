import React, { useState } from "react";
import { NavCreateTemplate } from "../components/NavCreateTemplate";
import { BodyCreateTemplate } from "../components/BodyCreateTemplate";
import { FooterWhatsapp } from "../components/FooterWhatsapp";

export const ViewConfigTemplate = () => {
  return (
    <>
      <NavCreateTemplate />
      <BodyCreateTemplate/>
      <FooterWhatsapp />
    </>
  );
};
