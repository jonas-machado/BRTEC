import { ponExceptions } from "@/constants/ponException";

export const handleVlan = (
  oltName: any,
  pon: string,
  vlan?: number,
  customVlan?: number
) => {
  if (vlan && !customVlan) {
    return vlan;
  } else if (customVlan) {
    return customVlan;
  } else if (oltName?.olt == "ITAPOA2") {
    const lastPon = pon.split("/");
    const lastVlanSlot1 = 0 + lastPon[2];
    const lastVlanSlot2 = parseInt(lastPon[2], 10) + 16;
    switch (lastPon[1]) {
      case "1":
        return Number("5" + lastVlanSlot1.slice(-2));
      case "2":
        return Number("5" + lastVlanSlot2);
    }
  } else if (
    ponExceptions[oltName!.olt] &&
    ponExceptions[oltName!.olt].includes(pon)
  ) {
    return ponExceptions[oltName!.olt].vlan;
  } else if (!vlan && !customVlan) {
    return Number(pon.replace(/[/]/gi, ""));
  }
};

export const handleVlanDatacom = (
  onuType: string,
  pon: string,
  vlan?: number,
  customVlan?: number
) => {
  if (vlan && !customVlan) {
    return vlan;
  } else if (customVlan) {
    return customVlan;
  } else if (!vlan && !customVlan) {
    if (onuType == "ONU") {
      const lastPon = pon.split("/");
      const lastVlanSlot1 = 0 + lastPon[2];
      return Number("1" + lastVlanSlot1.slice(-2));
    } else {
      return 119;
    }
  }
};
