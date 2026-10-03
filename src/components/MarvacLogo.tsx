"use client";

import React from "react";
import AuraLogoComponent from "./AuraLogo";

export default function MarvacLogo({
  className = "",
  isDark = false,
}: {
  className?: string;
  isDark?: boolean;
}) {
  return <AuraLogoComponent className={className} isDark={isDark} />;
}
