// Mock Database
export const db = {
  products: [
    {
      "productId": 13,
      "productCode": "RABIES_SHOT",
      "petSize": "ALL",
      "price": 2200.0,
      "displayNameJp": "狂犬病予防接種",
      "displayNameEn": "Rabies Shot",
      "descriptionJp": "単品",
      "descriptionEn": " Vaccination only",
      "isCombo": false,
      "priority": 101
    },
    {
      "productId": 14,
      "productCode": "MIXED",
      "petSize": "ALL",
      "price": 5500.0,
      "displayNameJp": "混合ワクチン",
      "displayNameEn": "Mixed Vaccine",
      "descriptionJp": "犬7種混合",
      "descriptionEn": "7-way combination",
      "isCombo": false,
      "priority": 201
    },
    {
      "productId": 15,
      "productCode": "HEARTWORM_MED",
      "petSize": "SMALL",
      "price": 990.0,
      "displayNameJp": "フィラリア",
      "displayNameEn": "Heartworm Med",
      "descriptionJp": "おやつタイプ(1回分)",
      "descriptionEn": "Single dose (Snack type)",
      "isCombo": false,
      "priority": 301
    },
    {
      "productId": 16,
      "productCode": "HEARTWORM_MED",
      "petSize": "MEDIUM",
      "price": 1210.0,
      "displayNameJp": "フィラリア",
      "displayNameEn": "Heartworm Med",
      "descriptionJp": "おやつタイプ(1回分)",
      "descriptionEn": "Single dose (Snack type)",
      "isCombo": false,
      "priority": 302
    },
    {
      "productId": 17,
      "productCode": "HEARTWORM_MED",
      "petSize": "LARGE",
      "price": 1760.0,
      "displayNameJp": "フィラリア",
      "displayNameEn": "Heartworm Med",
      "descriptionJp": "おやつタイプ(1回分)",
      "descriptionEn": "Single dose (Snack type)",
      "isCombo": false,
      "priority": 303
    },
    {
      "productId": 18,
      "productCode": "PARASITE_PREV",
      "petSize": "SMALL",
      "price": 1100.0,
      "displayNameJp": "ノミ・ダニ予防",
      "displayNameEn": "Parasite Prev.",
      "descriptionJp": "スポットタイプ(1回分)",
      "descriptionEn": "Single topical treatment",
      "isCombo": false,
      "priority": 401
    },
    {
      "productId": 19,
      "productCode": "PARASITE_PREV",
      "petSize": "MEDIUM",
      "price": 1430.0,
      "displayNameJp": "ノミ・ダニ予防",
      "displayNameEn": "Parasite Prev.",
      "descriptionJp": "スポットタイプ(1回分)",
      "descriptionEn": "Single topical treatment",
      "isCombo": false,
      "priority": 402
    },
    {
      "productId": 20,
      "productCode": "PARASITE_PREV",
      "petSize": "LARGE",
      "price": 1650.0,
      "displayNameJp": "ノミ・ダニ予防",
      "displayNameEn": "Parasite Prev.",
      "descriptionJp": "スポットタイプ(1回分)",
      "descriptionEn": "Single topical treatment",
      "isCombo": false,
      "priority": 403
    },
    {
      "productId": 1,
      "productCode": "SET_A",
      "petSize": "SMALL",
      "price": 22000.0,
      "displayNameJp": "Aセット",
      "displayNameEn": "Set A",
      "descriptionJp": "狂犬病予防接種\n混合ワクチン接種(犬7種混合)\nフィラリア症予防薬12回分(おやつタイプ)\n寄生虫病の予防3本(滴下タイプ)",
      "descriptionEn": "Heartworm (12 mo)\nParasite + Rabies\n7-way Vaccine",
      "isCombo": true,
      "priority": 101
    },
    {
      "productId": 2,
      "productCode": "SET_A",
      "petSize": "MEDIUM",
      "price": 25300.0,
      "displayNameJp": "Aセット",
      "displayNameEn": "Set A",
      "descriptionJp": "狂犬病予防接種\n混合ワクチン接種(犬7種混合)\nフィラリア症予防薬12回分(おやつタイプ)\n寄生虫病の予防3本(滴下タイプ)",
      "descriptionEn": "Heartworm (12 mo)\nParasite + Rabies\n7-way Vaccine",
      "isCombo": true,
      "priority": 102
    },
    {
      "productId": 3,
      "productCode": "SET_A",
      "petSize": "LARGE",
      "price": 30800.0,
      "displayNameJp": "Aセット",
      "displayNameEn": "Set A",
      "descriptionJp": "狂犬病予防接種\n混合ワクチン接種(犬7種混合)\nフィラリア症予防薬12回分(おやつタイプ)\n寄生虫病の予防3本(滴下タイプ)",
      "descriptionEn": "Heartworm (12 mo)\nParasite + Rabies\n7-way Vaccine",
      "isCombo": true,
      "priority": 103
    },
    {
      "productId": 4,
      "productCode": "SET_B",
      "petSize": "SMALL",
      "price": 20350.0,
      "displayNameJp": "Bセット",
      "displayNameEn": "Set B",
      "descriptionJp": "混合ワクチン接種(犬7種混合)\nフィラリア症予防薬12回分(おやつタイプ)\n寄生虫病の予防3本(滴下タイプ)",
      "descriptionEn": "Heartworm (12 mo)\nParasite\n7-way Vaccine",
      "isCombo": true,
      "priority": 201
    },
    {
      "productId": 5,
      "productCode": "SET_B",
      "petSize": "MEDIUM",
      "price": 23650.0,
      "displayNameJp": "Bセット",
      "displayNameEn": "Set B",
      "descriptionJp": "混合ワクチン接種(犬7種混合)\nフィラリア症予防薬12回分(おやつタイプ)\n寄生虫病の予防3本(滴下タイプ)",
      "descriptionEn": "Heartworm (12 mo)\nParasite\n7-way Vaccine",
      "isCombo": true,
      "priority": 202
    },
    {
      "productId": 6,
      "productCode": "SET_B",
      "petSize": "LARGE",
      "price": 29150.0,
      "displayNameJp": "Bセット",
      "displayNameEn": "Set B",
      "descriptionJp": "混合ワクチン接種(犬7種混合)\nフィラリア症予防薬12回分(おやつタイプ)\n寄生虫病の予防3本(滴下タイプ)",
      "descriptionEn": "Heartworm (12 mo)\nParasite\n7-way Vaccine",
      "isCombo": true,
      "priority": 203
    },
    {
      "productId": 7,
      "productCode": "SET_C",
      "petSize": "SMALL",
      "price": 8800.0,
      "displayNameJp": "Cセット",
      "displayNameEn": "Set C",
      "descriptionJp": "狂犬病予防接種\nフィラリア症予防薬12回分(おやつタイプ)\n寄生虫病の予防3本(滴下タイプ)",
      "descriptionEn": "Rabies\n7-way Vaccine\nParasite",
      "isCombo": true,
      "priority": 301
    },
    {
      "productId": 8,
      "productCode": "SET_C",
      "petSize": "MEDIUM",
      "price": 9350.0,
      "displayNameJp": "Cセット",
      "displayNameEn": "Set C",
      "descriptionJp": "狂犬病予防接種\nフィラリア症予防薬12回分(おやつタイプ)\n寄生虫病の予防3本(滴下タイプ)",
      "descriptionEn": "Rabies\n7-way Vaccine\nParasite",
      "isCombo": true,
      "priority": 302
    },
    {
      "productId": 9,
      "productCode": "SET_C",
      "petSize": "LARGE",
      "price": 9900.0,
      "displayNameJp": "Cセット",
      "displayNameEn": "Set C",
      "descriptionJp": "狂犬病予防接種\nフィラリア症予防薬12回分(おやつタイプ)\n寄生虫病の予防3本(滴下タイプ)",
      "descriptionEn": "Rabies\n7-way Vaccine\nParasite",
      "isCombo": true,
      "priority": 303
    },
    {
      "productId": 10,
      "productCode": "SET_D",
      "petSize": "SMALL",
      "price": 6050.0,
      "displayNameJp": "Dセット",
      "displayNameEn": "Set D",
      "descriptionJp": "狂犬病予防接種\n混合ワクチン接種(犬7種混合)",
      "descriptionEn": "Rabies\n7-way Vaccine",
      "isCombo": true,
      "priority": 401
    },
    {
      "productId": 11,
      "productCode": "SET_D",
      "petSize": "MEDIUM",
      "price": 6600.0,
      "displayNameJp": "Dセット",
      "displayNameEn": "Set D",
      "descriptionJp": "狂犬病予防接種\n混合ワクチン接種(犬7種混合)",
      "descriptionEn": "Rabies\n7-way Vaccine",
      "isCombo": true,
      "priority": 402
    },
    {
      "productId": 12,
      "productCode": "SET_D",
      "petSize": "LARGE",
      "price": 7150.0,
      "displayNameJp": "Dセット",
      "displayNameEn": "Set D",
      "descriptionJp": "狂犬病予防接種\n混合ワクチン接種(犬7種混合)",
      "descriptionEn": "Rabies\n7-way Vaccine",
      "isCombo": true,
      "priority": 403
    }
  ],
  prefectures: [
    {
      "id": 1,
      "name": "静冈県",
      "code": "shizuoka"
    },
    {
      "id": 2,
      "name": "愛知県",
      "code": "aichi"
    },
    {
      "id": 3,
      "name": "埼玉県",
      "code": "saitama"
    }
  ],
  locations: {
    shizuoka: [
      {
        "id": 1,
        "name": "パルモ葬祭",
        "address": "静岡県袋井市上山梨3-14-6",
        "phone": "0538-31-5011",
        "hospital": "犬猫病院ハナハナ",
        "timeSlots": [
          {
            "id": 1,
            "code": "SLOT_1",
            "label": "10:00-15:00"
          }
        ]
      },
      {
        "id": 4,
        "name": "パルモ葬祭",
        "address": "静岡県富士市中央町3-9-26",
        "phone": "0545-32-7211",
        "hospital": "本間獣医科医院",
        "timeSlots": [
          {
            "id": 1,
            "code": "SLOT_1",
            "label": "10:00-15:00"
          }
        ]
      },
      {
        "id": 5,
        "name": "パルモ葬祭",
        "address": "静岡県磐田市白羽174-1",
        "phone": "0538-31-5800",
        "hospital": "犬猫病院ハナハナ",
        "timeSlots": [
          {
            "id": 1,
            "code": "SLOT_1",
            "label": "10:00-15:00"
          }
        ]
      },
      {
        "id": 6,
        "name": "ラトリエ・",
        "address": "静岡県磐田市二之宮東4-5",
        "phone": "0538-33-2222",
        "hospital": "犬猫病院ハナハナ",
        "timeSlots": [
          {
            "id": 1,
            "code": "SLOT_1",
            "label": "10:00-15:00"
          }
        ]
      }],

    aichi: [
      {
        "id": 2,
        "name": "イズモ葬祭",
        "address": "愛知県豊橋市東新町115",
        "phone": "0532-55-1000",
        "hospital": "本間獣医科医院",
        "timeSlots": [
          {
            "id": 1,
            "code": "SLOT_1",
            "label": "10:00-15:00"
          }
        ]
      },
      {
        "id": 3,
        "name": "イズモ葬祭",
        "address": "愛知県豊川市八幡町弥五郎24",
        "phone": "0533-83-2311",
        "hospital": "本間獣医科医院",
        "timeSlots": [
          {
            "id": 1,
            "code": "SLOT_1",
            "label": "10:00-15:00"
          }
        ]
      },
      {
        "id": 7,
        "name": "イズモ葬祭",
        "address": "愛知県岡崎市美合町小豆坂91",
        "phone": "0564-51-7080",
        "hospital": "本間獣医科医院",
        "timeSlots": [
          {
            "id": 1,
            "code": "SLOT_1",
            "label": "10:00-15:00"
          }
        ]
      }],

    saitama: [
      {
        "id": 8,
        "name": "ホームズ浦",
        "address": "埼玉県さいたま市南区内谷7-12-5",
        "phone": "048-844-3334",
        "hospital": "犬猫病院ハナハナ",
        "timeSlots": [
          {
            "id": 2,
            "code": "SLOT_2",
            "label": "10:00-17:00"
          }
        ]
      }]
  }
};

