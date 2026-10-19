/*
 * ULAB 供应商表单的受控字段映射。
 * 这里只引用字典词条，不定义正式平台规格，也不产生兼容验证结论。
 * 原有混合技术说明完整保留；新增代码字段用于检索与适配关系比对。
 * request 代表“其他”及补充说明，不能作为已确认规格或适配依据。
 */
globalThis.ULAB_SUPPLIER_FIELD_DICTIONARIES = {
  shell: {},
  keycaps: {},
  switches: {},
  plate: {},
  pcb: {
    sensor_attribute: {
      term: 'sensor',
      values: ['Hall', 'TMR', 'request'],
      label: '此版本 PCBA 的固定传感属性'
    }
  },
  stabilizers: {},
  foam: {},
  accessories: {},
  cable: {},
  packaging: {}
};

globalThis.ULAB_SUPPLIER_EXTRA_DICTIONARY_FIELDS = {
  shell: [
    {
      key: 'housing_material_codes', label: '外壳材料', term: 'material', multiple: true,
      values: ['aluminum', 'pc', 'abs', 'brass', 'carbon', 'pom', 'request'], required: true,
      hint: '选择结构件实际使用的材料；各部件材料、牌号和表面工艺仍需在下方说明。'
    },
    {
      key: 'surface_finish_codes', label: '表面工艺', term: 'surface_finish', multiple: true,
      values: ['sand', 'anodized', 'brushed', 'powder', 'frosted', 'clear', 'request'], required: false,
      hint: '按这款外壳实际使用的工艺选择。'
    },
    {
      key: 'mounting_codes', label: '支持的安装结构', term: 'mount', multiple: true,
      values: ['screw', 'gasket', 'top-mount', 'clamshell', 'request'], required: true,
      hint: '可选择此版本支持的多种结构；固定点、紧固件和限制以图纸为准。'
    },
    {
      key: 'port_connector_codes', label: '开孔对应接口', term: 'connector', multiple: true,
      values: ['usb-c', 'usb-a', 'request'], required: true,
      hint: '此项仅标记开孔对应的接口类型，接口位置与开孔尺寸需另行提交。'
    }
  ],
  keycaps: [
    {
      key: 'keycap_material_codes', label: '键帽材料', term: 'material', multiple: true,
      values: ['pbt', 'abs', 'pc', 'pom', 'aluminum', 'request'], required: true,
      hint: '按这套键帽的实际材料选择，复合材料可多选。'
    },
    {
      key: 'legend_process_code', label: '字符工艺', term: 'legend_process',
      values: ['double-shot', 'dye-sub', 'laser', 'request'], required: false,
      hint: '二色注塑、热升华和镭雕来自现有商品参数；其他工艺可补充。'
    },
    {
      key: 'profile_code', label: '键帽高度体系', term: 'profile',
      values: ['cherry', 'oem', 'sa', 'xda', 'dsa', 'request'], required: true,
      hint: '按商品实际使用的键帽高度体系选择；没有合适选项时选择“其他”。'
    },
    {
      key: 'translucency_code', label: '透光方式', term: 'translucency',
      values: ['translucent', 'opaque', 'request'], required: false
    },
    {
      key: 'coverage_codes', label: '套装覆盖与补键', term: 'coverage', multiple: true,
      values: ['ansi61', 'space625', 'standard-extras', 'request'], required: false,
      hint: '勾选套装实际包含的键位；多配列或特殊补键可补充清单。'
    },
    {
      key: 'stem_interface_code', label: '轴心接口', term: 'stem_interface',
      values: ['mx-cross', 'request'], required: false
    }
  ],
  switches: [
    {
      key: 'structure_code', label: '轴体结构类型', term: 'structure',
      values: ['magnetic', 'mechanical', 'request'], required: true,
      hint: '结构分类不代表与 PCBA 兼容。Hall / TMR 属性随 PCBA 型号和硬件版本确定。'
    },
    {
      key: 'polarity_code', label: '磁极方向代码', term: 'polarity',
      values: ['N-down', 'S-down', 'request'], required: true,
      hint: '按轴体安装状态选择朝向 PCBA 一侧的磁极；观察基准、磁铁规格仍需说明。无磁铁或其他方向请选择“其他”并说明。'
    }
  ],
  plate: [
    {
      key: 'plate_material_codes', label: '定位板材料', term: 'material', multiple: true,
      values: ['aluminum', 'pc', 'fr4', 'brass', 'carbon', 'pom', 'request'], required: true,
      hint: '复合结构可选择多项；厚度、材料牌号和加工工艺需另行填写。'
    },
    {
      key: 'plate_mounting_codes', label: '支持的安装结构', term: 'mount', multiple: true,
      values: ['screw', 'gasket', 'top-mount', 'clamshell', 'request'], required: true,
      hint: '支持多种结构时须分别注明配套件与限制，最终以平台试装结果为准。'
    },
    {
      key: 'stabilizer_mounting_codes', label: '支持的卫星轴安装方式', term: 'mount', multiple: true,
      values: ['plate-mount', 'pcb-screw', 'clip', 'request'], required: true,
      hint: '选择此开孔版本支持的方式，并补充对应卫星轴型号、孔位与键位限制。'
    }
  ],
  pcb: [
    {
      key: 'connection_codes', label: '实际支持的连接方式', term: 'connection', multiple: true,
      values: ['wired', 'bluetooth', '2.4g', 'request'], required: true,
      hint: '三模方案需同时选择有线、蓝牙和 2.4 GHz；接收器与配套要求在下方说明。'
    },
    {
      key: 'connector_codes', label: '接口与子板连接器类型', term: 'connector', multiple: true,
      values: ['usb-c', 'usb-a', 'jst', 'request'], required: true,
      hint: '连接器系列相同不代表可互换；必须补充具体型号、引脚定义及图纸版本。'
    }
  ],
  stabilizers: [
    {
      key: 'stabilizer_mounting_code', label: '卫星轴安装方式', term: 'mount',
      values: ['plate-mount', 'pcb-screw', 'clip', 'request'], required: true,
      hint: '选择该型号及版本的安装方式；不同安装结构请分别建立配件档案。'
    },
    {
      key: 'key_size_codes', label: '套装包含的键位规格', term: 'keysize', multiple: true,
      values: ['2u', '6.25u', '7u', 'request'], required: true,
      hint: '选择本套装实际包含的规格，并在原配置说明中填写数量与随附部件。'
    },
    {
      key: 'lubrication_code', label: '润滑状态', term: 'lubrication',
      values: ['factory', 'unlubricated', 'request'], required: false
    }
  ],
  foam: [
    {
      key: 'foam_position_codes', label: '填充材料安装位置', term: 'position', multiple: true,
      values: ['case', 'pcb', 'plate', 'switch', 'request'], required: true,
      hint: '选择实际使用位置；层间关系、朝向及避让区域需通过说明与图纸明确。'
    },
    {
      key: 'foam_material_codes', label: '填充材料类型', term: 'material', multiple: true,
      values: ['poron', 'silicone', 'eva', 'rubber', 'request'], required: true,
      hint: '材料类型不代表已通过绝缘或防护测试；密度、厚度和测试依据另行提供。'
    },
    {
      key: 'foam_mounting_codes', label: '固定方式', term: 'mount', multiple: true,
      values: ['adhesive', 'independent', 'clip', 'request'], required: true,
      hint: '按实际安装方式选择；使用背胶、压缩固定等方式时，可选择“其他”并说明。'
    }
  ],
  accessories: [
    {
      key: 'accessory_type_code', label: '配件类型', term: 'accessory_type',
      values: ['desktop-badge', 'charm', 'request'], required: false
    },
    {
      key: 'accessory_material_codes', label: '装饰配件材料', term: 'material', multiple: true,
      values: ['aluminum', 'pc', 'abs', 'brass', 'carbon', 'rubber', 'silicone', 'request'], required: true,
      hint: '选择主要材料，并补充具体部件、表面工艺和结构说明。'
    },
    {
      key: 'accessory_surface_codes', label: '表面工艺', term: 'surface_finish', multiple: true,
      values: ['brushed', 'anodized', 'powder', 'matte', 'frosted', 'clear', 'request'], required: false
    },
    {
      key: 'accessory_mounting_codes', label: '装饰配件固定方式', term: 'mount', multiple: true,
      values: ['screw', 'clip', 'adhesive', 'independent', 'request'], required: true,
      hint: '磁吸、悬挂等方式可选择“其他”，并说明配套件与安装位置。'
    }
  ],
  cable: [
    {
      key: 'connector_pair_code', label: '线材两端接口组合', term: 'connector',
      values: ['usb-a-c', 'usb-c-c', 'request'], required: true,
      hint: '接口组合不代表协议或供电能力；插头型号、转接件和能力参数需另行提供。'
    },
    {
      key: 'jacket_material_codes', label: '线材外被与编织材料', term: 'material', multiple: true,
      values: ['nylon', 'tpe', 'silicone', 'rubber', 'request'], required: true,
      hint: '此项归类外被及编织材料；线芯、屏蔽与可拆段连接定义保留在原技术说明中。'
    },
    {
      key: 'cable_shape_codes', label: '线型', term: 'cable_shape', multiple: true,
      values: ['straight', 'coiled', 'detachable', 'request'], required: false
    }
  ],
  packaging: [
    {
      key: 'contents_format_codes', label: '适用的装配形态', term: 'package', multiple: true,
      values: ['kit', 'assembled', 'request'], required: true,
      hint: '选择包装实际支持的散件或整机形态；具体型号、数量与内衬布局另行说明。'
    },
    {
      key: 'packaging_material_codes', label: '包装与内衬材料', term: 'material', multiple: true,
      values: ['paper', 'aluminum', 'nylon', 'eva', 'poron', 'pc', 'abs', 'rubber', 'request'], required: true,
      hint: '选择外部与内衬使用的材料，并分别说明用途；使用其他材料时请补充说明。'
    }
  ]
};
