/* ULAB 选品字段与目录。保留历史来源标记；目录引用不代表已验证兼容。 */
globalThis.ULAB_SUPPLIER_DICTIONARY = {
  "revision": "ULAB-SUPPLIER-DICT-DEMO-20261010-V2",
  "status": "demo",
  "sourceRevision": "ULAB-CATALOG-DEMO-20260915-V05",
  "notice": "用于 ULAB 商品选品资料填写；型号、硬件版本和适配关系须由平台核验，选择目录条目不代表已验证兼容。",
  "sources": [
    "assets/js/lab-sku-specs.js",
    "assets/js/lab-shell-catalogue.js",
    "assets/js/lab-component-catalogs.js",
    "assets/js/lab-extra-products.js"
  ],
  "layouts": [
    {
      "value": "ansi60",
      "label": "60% ANSI"
    },
    {
      "value": "iso60",
      "label": "60% ISO"
    },
    {
      "value": "ansi65",
      "label": "65%"
    },
    {
      "value": "ansi75",
      "label": "75%"
    },
    {
      "value": "tkl80",
      "label": "80% / TKL"
    },
    {
      "value": "full100",
      "label": "100%"
    },
    {
      "value": "not-applicable",
      "label": "不涉及键盘配列"
    },
    {
      "value": "request",
      "label": "其他"
    }
  ],
  "standards": [
    {
      "id": "DEMO-60-V1",
      "label": "60% ANSI 孔位（历史资料，待确认）",
      "layout": "ansi60",
      "categories": [
        "shell",
        "pcb",
        "plate",
        "foam"
      ],
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0（资料修订）"
        }
      ],
      "evidence": "demo",
      "note": "此条目仅保留已有资料，受控工程图和公差尚待平台确认。资料修订号不代表正式工程规格版本。"
    }
  ],
  "products": [
    {
      "id": "kbd",
      "label": "KBD · Holy 60",
      "category": "shell",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": [],
          "mounts": [
            "螺丝固定"
          ],
          "pcbas": [
            "pcb-core",
            "pcb-link"
          ]
        }
      ]
    },
    {
      "id": "arc",
      "label": "ARC · Frame 60",
      "category": "shell",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": [],
          "mounts": [
            "Gasket",
            "Top Mount"
          ],
          "pcbas": [
            "pcb-core",
            "pcb-link",
            "pcb-air"
          ]
        }
      ]
    },
    {
      "id": "mist",
      "label": "MIST · Clear 60",
      "category": "shell",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": [],
          "mounts": [
            "上下壳锁合"
          ],
          "pcbas": [
            "pcb-link",
            "pcb-air"
          ]
        }
      ]
    },
    {
      "id": "stabilizer-cream",
      "label": "ARC · 稳定轴 V2",
      "category": "stabilizers",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "stabilizer-smoke",
      "label": "MIST · 静音卫星轴",
      "category": "stabilizers",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "fr4",
      "label": "ARC · 墨玉 FR4",
      "category": "plate",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": [],
          "mounts": [
            "螺丝固定",
            "上下壳锁合",
            "Gasket",
            "Top Mount"
          ]
        }
      ]
    },
    {
      "id": "pc",
      "label": "MIST · 雾透 PC",
      "category": "plate",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": [],
          "mounts": [
            "螺丝固定",
            "上下壳锁合",
            "Gasket",
            "Top Mount"
          ]
        }
      ]
    },
    {
      "id": "aluminum",
      "label": "ULAB · 冰银铝",
      "category": "plate",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": [],
          "mounts": [
            "螺丝固定",
            "上下壳锁合",
            "Gasket",
            "Top Mount"
          ]
        }
      ]
    },
    {
      "id": "carbon",
      "label": "ARC · 碳夜",
      "category": "plate",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": [],
          "mounts": [
            "螺丝固定",
            "上下壳锁合",
            "Gasket",
            "Top Mount"
          ]
        }
      ]
    },
    {
      "id": "brass",
      "label": "MIST · 香槟黄铜",
      "category": "plate",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": [],
          "mounts": [
            "螺丝固定",
            "上下壳锁合",
            "Gasket",
            "Top Mount"
          ]
        }
      ]
    },
    {
      "id": "pom",
      "label": "ULAB · 奶霜 POM",
      "category": "plate",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": [],
          "mounts": [
            "螺丝固定",
            "上下壳锁合",
            "Gasket",
            "Top Mount"
          ]
        }
      ]
    },
    {
      "id": "half",
      "label": "ARC · 半定位 FR4",
      "category": "plate",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": [],
          "mounts": [
            "Top Mount"
          ]
        }
      ]
    },
    {
      "id": "cloud45",
      "label": "ULAB · 云白 45",
      "category": "switches",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": [],
          "polarity": "N-down",
          "pcbas": [
            "pcb-core",
            "pcb-link"
          ]
        }
      ]
    },
    {
      "id": "jade40",
      "label": "ARC · 青岚 40",
      "category": "switches",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": [],
          "polarity": "N-down",
          "pcbas": [
            "pcb-core",
            "pcb-link"
          ]
        }
      ]
    },
    {
      "id": "amber50",
      "label": "MIST · 琥珀 50",
      "category": "switches",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": [],
          "polarity": "S-down",
          "pcbas": [
            "pcb-air"
          ]
        }
      ]
    },
    {
      "id": "mist-white",
      "label": "ARC · 雾白",
      "category": "keycaps",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "retro-gray",
      "label": "MIST · 复古灰",
      "category": "keycaps",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "moon",
      "label": "ULAB · 月光",
      "category": "keycaps",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "smoke",
      "label": "ARC · 烟晶",
      "category": "keycaps",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "night",
      "label": "MIST · 夜航",
      "category": "keycaps",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "mint",
      "label": "ULAB · 薄荷",
      "category": "keycaps",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "plain",
      "label": "ARC · 素色",
      "category": "keycaps",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "sunset",
      "label": "MIST · 落日",
      "category": "keycaps",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "pcb-core",
      "label": "ULAB · Core 60",
      "category": "pcb",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V2.0",
          "label": "V2.0",
          "firmwares": [
            {
              "id": "CORE-HALL-1.2",
              "label": "CORE-HALL-1.2"
            }
          ],
          "sensor": "Hall",
          "polarity": "N-down",
          "shells": [
            "kbd",
            "arc"
          ]
        }
      ]
    },
    {
      "id": "pcb-link",
      "label": "ARC · Link 60",
      "category": "pcb",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V2.0",
          "label": "V2.0",
          "firmwares": [
            {
              "id": "LINK-HALL-1.1",
              "label": "LINK-HALL-1.1"
            }
          ],
          "sensor": "Hall",
          "polarity": "N-down",
          "shells": [
            "kbd",
            "arc",
            "mist"
          ]
        }
      ]
    },
    {
      "id": "pcb-air",
      "label": "MIST · Air 60",
      "category": "pcb",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V2.0",
          "label": "V2.0",
          "firmwares": [
            {
              "id": "AIR-TMR-1.0",
              "label": "AIR-TMR-1.0"
            }
          ],
          "sensor": "TMR",
          "polarity": "S-down",
          "shells": [
            "arc",
            "mist"
          ]
        }
      ]
    },
    {
      "id": "foam-standard",
      "label": "外壳自带填充包",
      "category": "foam",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "foam-poron",
      "label": "ARC · 柔雾填充包",
      "category": "foam",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "foam-silicone",
      "label": "MIST · 硅胶填充包",
      "category": "foam",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "accessory-badge",
      "label": "ARC · 金属桌面铭牌",
      "category": "accessories",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "accessory-charm",
      "label": "MIST · 迷你挂饰",
      "category": "accessories",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "cable-basic",
      "label": "ULAB · 基础连接线",
      "category": "cable",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "cable-braided",
      "label": "ARC · 编织连接线",
      "category": "cable",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "cable-coiled",
      "label": "MIST · 卷线连接线",
      "category": "cable",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "pack-standard",
      "label": "ULAB · 标准包装",
      "category": "packaging",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    },
    {
      "id": "pack-self",
      "label": "ULAB · 自行组装分装包装",
      "category": "packaging",
      "layout": "ansi60",
      "evidence": "demo",
      "versions": [
        {
          "id": "V1.0",
          "label": "V1.0",
          "firmwares": []
        }
      ]
    }
  ],
  "terms": {
    "legend_process": [
      { "value": "double-shot", "label": "二色注塑", "origin": "catalogue" },
      { "value": "dye-sub", "label": "热升华", "origin": "catalogue" },
      { "value": "laser", "label": "镭雕", "origin": "catalogue" },
      { "value": "request", "label": "其他工艺，补充说明", "origin": "request" }
    ],
    "translucency": [
      { "value": "translucent", "label": "透光", "origin": "catalogue" },
      { "value": "opaque", "label": "不透光", "origin": "catalogue" },
      { "value": "request", "label": "其他透光方式，补充说明", "origin": "request" }
    ],
    "coverage": [
      { "value": "ansi61", "label": "ANSI 61 键", "origin": "catalogue" },
      { "value": "space625", "label": "6.25U 空格", "origin": "catalogue" },
      { "value": "standard-extras", "label": "标准补键", "origin": "catalogue" },
      { "value": "request", "label": "其他覆盖 / 补键，补充说明", "origin": "request" }
    ],
    "stem_interface": [
      { "value": "mx-cross", "label": "MX 十字轴", "origin": "catalogue" },
      { "value": "request", "label": "其他轴心接口，补充说明", "origin": "request" }
    ],
    "surface_finish": [
      { "value": "sand", "label": "细砂阳极", "origin": "catalogue" },
      { "value": "anodized", "label": "阳极氧化", "origin": "catalogue" },
      { "value": "brushed", "label": "拉丝金属", "origin": "catalogue" },
      { "value": "powder", "label": "哑光喷涂", "origin": "catalogue" },
      { "value": "frosted", "label": "半透明磨砂", "origin": "catalogue" },
      { "value": "clear", "label": "通透抛光", "origin": "catalogue" },
      { "value": "matte", "label": "哑光", "origin": "catalogue" },
      { "value": "request", "label": "其他表面工艺，补充说明", "origin": "request" }
    ],
    "lubrication": [
      { "value": "factory", "label": "出厂预润滑", "origin": "catalogue" },
      { "value": "unlubricated", "label": "未润滑", "origin": "supplier_submission" },
      { "value": "request", "label": "其他润滑状态，补充说明", "origin": "request" }
    ],
    "accessory_type": [
      { "value": "desktop-badge", "label": "桌面铭牌 / 摆件", "origin": "catalogue" },
      { "value": "charm", "label": "挂饰", "origin": "catalogue" },
      { "value": "request", "label": "其他配件类型，补充说明", "origin": "request" }
    ],
    "cable_shape": [
      { "value": "straight", "label": "直线", "origin": "catalogue" },
      { "value": "coiled", "label": "卷线", "origin": "catalogue" },
      { "value": "detachable", "label": "可拆接头 / 分体", "origin": "catalogue" },
      { "value": "request", "label": "其他线型，补充说明", "origin": "request" }
    ],
    "sensor": [
      {
        "value": "Hall",
        "label": "Hall（霍尔）"
      },
      {
        "value": "TMR",
        "label": "TMR（隧道磁阻）"
      },
      {
        "value": "request",
        "label": "其他"
      }
    ],
    "material": [
      {
        "value": "aluminum",
        "label": "铝合金"
      },
      {
        "value": "pc",
        "label": "PC"
      },
      {
        "value": "abs",
        "label": "ABS"
      },
      {
        "value": "pbt",
        "label": "PBT"
      },
      {
        "value": "fr4",
        "label": "FR-4"
      },
      {
        "value": "brass",
        "label": "黄铜"
      },
      {
        "value": "carbon",
        "label": "碳纤维"
      },
      {
        "value": "pom",
        "label": "POM"
      },
      {
        "value": "poron",
        "label": "微孔聚氨酯"
      },
      {
        "value": "silicone",
        "label": "硅胶"
      },
      {
        "value": "eva",
        "label": "EVA"
      },
      {
        "value": "rubber",
        "label": "橡胶 / 软胶"
      },
      {
        "value": "paper",
        "label": "纸材"
      },
      {
        "value": "nylon",
        "label": "尼龙"
      },
      {
        "value": "tpe",
        "label": "TPE"
      },
      {
        "value": "request",
        "label": "其他"
      }
    ],
    "mount": [
      {
        "value": "screw",
        "label": "螺丝固定"
      },
      {
        "value": "gasket",
        "label": "Gasket"
      },
      {
        "value": "top-mount",
        "label": "Top Mount"
      },
      {
        "value": "clamshell",
        "label": "上下壳锁合"
      },
      {
        "value": "plate-mount",
        "label": "板载卡扣"
      },
      {
        "value": "pcb-screw",
        "label": "PCB 螺丝固定"
      },
      {
        "value": "clip",
        "label": "卡扣固定"
      },
      {
        "value": "adhesive",
        "label": "粘接"
      },
      {
        "value": "independent",
        "label": "独立放置"
      },
      {
        "value": "request",
        "label": "其他"
      }
    ],
    "polarity": [
      {
        "value": "N-down",
        "label": "N 极朝向 PCBA"
      },
      {
        "value": "S-down",
        "label": "S 极朝向 PCBA"
      },
      {
        "value": "request",
        "label": "其他"
      }
    ],
    "connector": [
      {
        "value": "usb-c",
        "label": "USB-C"
      },
      {
        "value": "usb-a",
        "label": "USB-A"
      },
      {
        "value": "usb-a-c",
        "label": "USB-A → USB-C"
      },
      {
        "value": "usb-c-c",
        "label": "USB-C → USB-C"
      },
      {
        "value": "jst",
        "label": "JST 系列（需补充型号）"
      },
      {
        "value": "request",
        "label": "其他"
      }
    ],
    "profile": [
      {
        "value": "cherry",
        "label": "Cherry 原厂高度"
      },
      {
        "value": "oem",
        "label": "OEM"
      },
      {
        "value": "sa",
        "label": "SA"
      },
      {
        "value": "xda",
        "label": "XDA"
      },
      {
        "value": "dsa",
        "label": "DSA"
      },
      {
        "value": "request",
        "label": "其他"
      }
    ],
    "connection": [
      {
        "value": "wired",
        "label": "有线"
      },
      {
        "value": "bluetooth",
        "label": "蓝牙"
      },
      {
        "value": "2.4g",
        "label": "2.4 GHz"
      },
      {
        "value": "tri-mode",
        "label": "三模（有线 / 蓝牙 / 2.4 GHz）"
      },
      {
        "value": "request",
        "label": "其他"
      }
    ],
    "position": [
      {
        "value": "case",
        "label": "外壳底部"
      },
      {
        "value": "pcb",
        "label": "PCBA 区域"
      },
      {
        "value": "plate",
        "label": "定位板与 PCBA 之间"
      },
      {
        "value": "switch",
        "label": "轴下"
      },
      {
        "value": "request",
        "label": "其他"
      }
    ],
    "keysize": [
      {
        "value": "2u",
        "label": "2U"
      },
      {
        "value": "6.25u",
        "label": "6.25U"
      },
      {
        "value": "7u",
        "label": "7U"
      },
      {
        "value": "request",
        "label": "其他"
      }
    ],
    "structure": [
      {
        "value": "magnetic",
        "label": "磁轴结构"
      },
      {
        "value": "mechanical",
        "label": "机械触点结构"
      },
      {
        "value": "request",
        "label": "其他"
      }
    ],
    "package": [
      {
        "value": "kit",
        "label": "配件分装"
      },
      {
        "value": "assembled",
        "label": "整机包装"
      },
      {
        "value": "request",
        "label": "其他"
      }
    ],
    "relation": [
      {
        "value": "compatible",
        "label": "供应商声明兼容"
      },
      {
        "value": "conditional",
        "label": "供应商声明有条件兼容"
      },
      {
        "value": "incompatible",
        "label": "供应商声明不兼容"
      },
      {
        "value": "pending",
        "label": "尚待确认"
      }
    ],
    "unit": [
      {
        "value": "piece",
        "label": "件"
      },
      {
        "value": "set",
        "label": "套"
      },
      {
        "value": "switch",
        "label": "颗"
      },
      {
        "value": "sheet",
        "label": "张"
      },
      {
        "value": "meter",
        "label": "米"
      },
      {
        "value": "request",
        "label": "其他"
      }
    ]
  }
};
