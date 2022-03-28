/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Ares from "../assets/images/ares.png";
import Bucky from "../assets/images/bucky.png";
import Bulldog from "../assets/images/bulldog.png";
import Classic from "../assets/images/classic.png";
import Frenzy from "../assets/images/frenzy.png";
import Ghost from "../assets/images/ghost.png";
import Guardian from "../assets/images/guardian.png";
// import Headhunter from "../assets/images/headhunter.png";
import Judge from "../assets/images/judge.png";
import Knife from "../assets/images/knife.png";
import Marshal from "../assets/images/marshal.png";
import Odin from "../assets/images/odin.png";
import Operator from "../assets/images/operator.png";
import Phantom from "../assets/images/phantom.png";
import Sheriff from "../assets/images/sheriff.png";
import Shorty from "../assets/images/shorty.png";
import Spectre from "../assets/images/spectre.png";
import Stinger from "../assets/images/stinger.png";
// import TourDeForce from "../assets/images/tourdeforce.png";
import Vandal from "../assets/images/vandal.png";

export const weapons = {
  "1BAA85B4-4C70-1284-64BB-6481DFC3BB4E": Ghost,
  "2F59173C-4BED-B6C3-2191-DEA9B58BE9C7": Knife,
  "4ADE7FAA-4CF1-8376-95EF-39884480959B": Guardian,
  "9C82E19D-4575-0200-1A81-3EACF00CF872": Vandal,
  "29A0CFAB-485B-F5D5-779A-B59F85E204A8": Classic,
  "42DA8CCC-40D5-AFFC-BEEC-15AA47B42EDA": Shorty,
  "44D4E95C-4157-0037-81B2-17841BF2E8E3": Frenzy,
  "55D8A0F4-4274-CA67-FE2C-06AB45EFDF58": Ares,
  "63E6C2B6-4A8E-869C-3D4C-E38355226584": Odin,
  // "856D9A7E-4B06-DC37-15DC-9D809C37CB90": Headhunter,
  "910BE174-449B-C412-AB22-D0873436B21B": Bucky,
  // "39099FB5-4293-DEF4-1E09-2E9080CE7456": TourDeForce,
  "462080D1-4035-2937-7C09-27AA2A5C27A7": Spectre,
  "A03B24D3-4319-996D-0F8C-94BBFBA1DFC7": Operator,
  "AE3DE142-4D85-2547-DD26-4E90BED35CF7": Bulldog,
  "C5DE005C-4BDC-26A7-A47D-C295EAAAE9D8": Classic,
  "C4883E50-4494-202C-3EC3-6B8A9284F00B": Marshal,
  "E336C6B8-418D-9340-D77F-7A9E4CFE0702": Sheriff,
  "EC845BF4-4F79-DDDA-A3DA-0DB3774B2794": Judge,
  "EE8E8D15-496B-07AC-E5F6-8FAE5D4C7B1A": Phantom,
  "F7E1B454-4AD4-1063-EC0A-159E56B58941": Stinger,
  // "3DE32920-4A8F-0499-7740-648A5BF95470": GoldenGun,
};

export type WeaponId = keyof typeof weapons;

interface Props {
  readonly weaponId: WeaponId;
  readonly width?: number;
  readonly height?: number;
}

export const WeaponIcon = ({ height = 512, weaponId, width }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        overflow: "hidden",
        padding: "4px",
      }}
    >
      <img
        src={weapons[weaponId]}
        width={width}
        height={height}
        alt={weapons[weaponId]}
      />
    </div>
  );
};
