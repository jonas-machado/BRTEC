interface OltConfig {
  template: string;
  oltName: string;
}

export class scriptText {
  pon: string;
  id: number;
  sn: string;
  client: string;
  vlan: number | undefined | string;
  olt: string;
  constructor(
    pon: string,
    id: number,
    sn: string,
    client: string,
    olt: string | undefined,
    vlan?: number
  ) {
    this.pon = pon;
    this.id = id;
    this.sn = sn;
    this.client = client;
    this.vlan = vlan;
    this.olt = olt!;
  }

  chima(): string {
    const oltConfigs: OltConfig[] = [
      {
        oltName: "MIRANDA",
        template: `\
interface gpon-olt_${this.pon}
onu ${this.id} type ZTE-F601 sn ${this.sn} 
! 
interface gpon-onu_${this.pon}:${this.id}
description ${this.client}
tcont 2 name Tcont100M profile OT 
gemport 1 name Gemport1 unicast tcont 2 dir both queue 1 
switchport mode trunk vport 1 
switchport vlan ${this.vlan} tag vport 1 
! 
pon-onu-mng gpon-onu_${this.pon}:${this.id}
service inter gemport 1 vlan ${this.vlan}
performance ethuni eth_0/1 start 
vlan port eth_0/1 mode tag vlan ${this.vlan}
!`,
      },
      {
        oltName: "ITAPOA",
        template: `\
interface gpon-olt_${this.pon}
onu ${this.id} type ZTE-F601 sn ${this.sn}
!
interface gpon-onu_${this.pon}:${this.id}
description ${this.client}
tcont 2 name Tcont100M profile OT
gemport 1 name Gemport1 unicast tcont 2 dir both
switchport mode trunk vport 1
switchport vlan ${this.vlan} tag vport 1
!
pon-onu-mng gpon-onu_${this.pon}:${this.id}
service dataservice type internet gemport 1 cos 0 vlan ${this.vlan}
switchport-bind switch_0/1 iphost 1
vlan-filter-mode iphost 1 tag-filter vid-filter untag-filter discard
vlan-filter iphost 1 priority 0 vid ${this.vlan}
vlan port eth_0/1 mode tag vlan ${this.vlan}
security-mng 1 state enable mode permit
!`,
      },
      {
        oltName: "VILA NOVA",
        template: `\
interface gpon-olt_${this.pon}
onu ${this.id} type ZTE-F601 sn ${this.sn}
!
interface gpon-onu_${this.pon}:${this.id}
description ${this.client}
tcont 2 name Tcont100M profile OT
gemport 1 name Gemport1 unicast tcont 2 dir both queue 1
switchport mode trunk vport 1
switchport vlan ${this.vlan} tag vport 1
!
pon-onu-mng gpon-onu_${this.pon}:${this.id}
service inter gemport 1 vlan ${this.vlan}
performance ethuni eth_0/1 start
vlan port eth_0/1 mode tag vlan ${this.vlan}
!`,
      },
    ];

    const defaultScript = `\
interface gpon-olt_${this.pon}
onu ${this.id} type ZTE-F601 sn ${this.sn} 
! 
interface gpon-onu_${this.pon}:${this.id}
description ${this.client}
tcont 2 name Tcont100M profile OT 
gemport 1 name Gemport1 tcont 2 queue 1 
switchport mode trunk vport 1 
service-port 1 vport 1 user-vlan ${this.vlan} vlan ${this.vlan}
! 
pon-onu-mng gpon-onu_${this.pon}:${this.id}
service inter gemport 1 vlan ${this.vlan}
performance ethuni eth_0/1 start 
vlan port eth_0/1 mode tag vlan ${this.vlan}
!`;

    const config = oltConfigs.find((cfg) => cfg.oltName === this.olt);

    if (config) {
      return config.template;
    } else {
      // Handle the case when the OLT is not found (e.g., return a default script)
      return defaultScript;
    }
  }
  /// onu zte
  zte(): string {
    const oltConfigs: OltConfig[] = [
      {
        oltName: "VILA NOVA",
        template: `\
interface gpon-olt_${this.pon}
onu ${this.id} type ZTE-F601 sn ${this.sn}
!
interface gpon-onu_${this.pon}:${this.id}
description ${this.client}
tcont 2 name Tcont100M profile OT
gemport 1 name Gemport1 unicast tcont 2 dir both
switchport mode trunk vport 1
switchport vlan ${this.vlan} tag vport 1
!
pon-onu-mng gpon-onu_${this.pon}:${this.id}
service dataservice type internet gemport 1 cos 0 vlan ${this.vlan}
switchport-bind switch_0/1 iphost 1
vlan-filter-mode iphost 1 tag-filter vid-filter untag-filter discard
vlan-filter iphost 1 priority 0 vid ${this.vlan}
vlan port eth_0/1 mode tag vlan ${this.vlan}
security-mng 1 state enable mode permit
!`,
      },
      {
        oltName: "ITAPOA",
        template: `\
interface gpon-olt_${this.pon}
onu ${this.id} type ZTE-F601 sn ${this.sn}
!
interface gpon-onu_${this.pon}:${this.id}
description ${this.client}
tcont 2 name Tcont100M profile OT
gemport 1 name Gemport1 unicast tcont 2 dir both
switchport mode trunk vport 1
switchport vlan ${this.vlan} tag vport 1
!
pon-onu-mng gpon-onu_${this.pon}:${this.id}
service dataservice type internet gemport 1 cos 0 vlan ${this.vlan}
switchport-bind switch_0/1 iphost 1
vlan-filter-mode iphost 1 tag-filter vid-filter untag-filter discard
vlan-filter iphost 1 priority 0 vid ${this.vlan}
vlan port eth_0/1 mode tag vlan ${this.vlan}
security-mng 1 state enable mode permit
!`,
      },
      {
        oltName: "MIRANDA",
        template: `\
interface gpon-olt_${this.pon}
onu ${this.id} type ZTE-F601 sn ${this.sn}
!
interface gpon-onu_${this.pon}:${this.id}
description ${this.client}
tcont 2 name Tcont100M profile OT
gemport 1 name Gemport1 unicast tcont 2 dir both
switchport mode trunk vport 1
switchport vlan ${this.vlan} tag vport 1
!
pon-onu-mng gpon-onu_${this.pon}:${this.id}
service dataservice type internet gemport 1 cos 0 vlan ${this.vlan}
switchport-bind switch_0/1 iphost 1
vlan-filter-mode iphost 1 tag-filter vid-filter untag-filter discard
vlan-filter iphost 1 priority 0 vid ${this.vlan}
vlan port eth_0/1 mode tag vlan ${this.vlan}
security-mng 1 state enable mode permit
!`,
      },
    ];

    const defaultScript = `\
interface gpon-olt_${this.pon}
onu ${this.id} type ZTE-F601 sn ${this.sn}
!
interface gpon-onu_${this.pon}:${this.id}
description ${this.client}
tcont 2 name Tcont100M profile OT
gemport 1 name Gemport1 tcont 2 queue 1
switchport mode trunk vport 1
service-port 1 vport 1 user-vlan ${this.vlan} vlan ${this.vlan}
!
pon-onu-mng gpon-onu_${this.pon}:${this.id}
service dataservice gemport 1 cos 0 vlan ${this.vlan}
switchport-bind switch_0/1 iphost 1
vlan port eth_0/1 mode tag vlan ${this.vlan}
!`;

    const config = oltConfigs.find((cfg) => cfg.oltName === this.olt);

    if (config) {
      return config.template;
    } else {
      // Handle the case when the OLT is not found (e.g., return a default script)
      return defaultScript;
    }
  }

  //SCRIPT PARA VALENET

  valenet(): string {
    const defaultScript = `\
interface gpon-olt_${this.pon}
onu ${this.id} type ZTE-F601 sn ${this.sn}
!
interface gpon-onu_${this.pon}:${this.id}
description ${this.client}
tcont 2 name Tcont100M profile OT
gemport 1 name Gemport1 tcont 2 queue 1
switchport mode trunk vport 1
service-port 1 vport 1 user-vlan ${this.vlan} vlan ${this.vlan}
!
pon-onu-mng gpon-onu_${this.pon}:${this.id}
service dataservice gemport 1 cos 0 vlan ${this.vlan} 
performance ethuni eth_0/1 start
!`;
    return defaultScript;
  }
}

// const baseTemplate = `\
// interface gpon-olt_${this.pon}
// onu ${this.id} type ZTE-F601 sn ${this.sn}
// !
// interface gpon-onu_${this.pon}:${this.id}
// description ${this.client}
// tcont 2 name Tcont100M profile OT
// `;

// const oltTemplates = {
//   MIRANDA: {
//     extraConfig: `\
// gemport 1 name Gemport1 tcont 2 queue 1
// switchport mode trunk vport 1
// switchport vlan ${this.vlan} tag vport 1
// !`,
//   },
//   ITAPOA: {
//     extraConfig: `\
// gemport 1 name Gemport1 unicast tcont 2 dir both
// switchport mode trunk vport 1
// switchport vlan ${this.vlan} tag vport 1
// !
// pon-onu-mng gpon-onu_${this.pon}:${this.id}
// service dataservice type internet gemport 1 cos 0 vlan ${this.vlan}
// switchport-bind switch_0/1 iphost 1
// vlan-filter-mode iphost 1 tag-filter vid-filter untag-filter discard
// vlan-filter iphost 1 priority 0 vid ${this.vlan}
// vlan port eth_0/1 mode tag vlan ${this.vlan}
// security-mng 1 state enable mode permit
// !`,
//   },
//   'VILA NOVA': {
//     extraConfig: `\
// gemport 1 name Gemport1 unicast tcont 2 dir both queue 1
// switchport mode trunk vport 1
// switchport vlan ${this.vlan} tag vport 1
// !
// pon-onu-mng gpon-onu_${this.pon}:${this.id}
// service inter gemport 1 vlan ${this.vlan}
// performance ethuni eth_0/1 start
// vlan port eth_0/1 mode tag vlan ${this.vlan}
// !`,
//   },
// };

// const defaultExtraConfig = `\
// gemport 1 name Gemport1 tcont 2 queue 1
// switchport mode trunk vport 1
// service-port 1 vport 1 user-vlan ${this.vlan} vlan ${this.vlan}
// !`;

// const config = oltTemplates[this.olt] || { extraConfig: defaultExtraConfig };

// return baseTemplate + config.extraConfig;
