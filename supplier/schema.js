/* ULAB 供应商技术资料草案。以下适配信息均为供应商声明，须经平台验证。 */
globalThis.ULAB_SUPPLIER_SCHEMA = {
  categories: [
    {
      id: 'shell',
      label: '外壳',
      fields: [
        { key: 'housing_material', label: '外壳材质与结构', type: 'textarea', required: true, placeholder: '分别说明上壳、底壳、配重及其他结构件的材质。' },
        { key: 'mounting_structure', label: '安装结构与固定方式', type: 'textarea', required: true, placeholder: '说明安装结构、固定点及所需紧固件。' },
        { key: 'port_openings', label: '接口开孔与位置', type: 'textarea', required: true, hint: '写明开孔对应的接口，并引用所附图纸的编号或页码。' },
        { key: 'declared_pcb_fit', label: '声明适配的 PCBA 型号及版本', type: 'textarea', required: true, hint: '填写具体型号、硬件版本和配套要求；尚未确定时请明确注明。' },
        { key: 'declared_plate_fit', label: '声明适配的定位板与安装件', type: 'textarea', required: true, placeholder: '填写定位板型号、版本及必需的垫片、螺钉等。' },
        { key: 'wireless_battery_space', label: '无线与电池安装条件', type: 'textarea', required: false, hint: '如支持无线方案，说明天线、接收器和电池的空间或材料限制。' },
        { key: 'surface_finish', label: '表面工艺与外观验收说明', type: 'textarea', required: false, placeholder: '说明工艺、颜色及可接受的外观差异。' },
        { key: 'included_hardware', label: '随壳部件与装配限制', type: 'textarea', required: true, placeholder: '列出随附部件、需要另购的部件，以及装配时需注意的干涉位置。' }
      ]
    },
    {
      id: 'keycaps',
      label: '键帽',
      fields: [
        { key: 'keycap_profile', label: '键帽高度与轮廓', type: 'text', required: true, placeholder: '填写高度体系、轮廓名称及行位分布。' },
        { key: 'keycap_material', label: '材质与成型工艺', type: 'text', required: true, placeholder: '填写材质、成型方式和字符工艺。' },
        { key: 'stem_interface', label: '轴心接口与安装要求', type: 'textarea', required: true, hint: '说明接口结构，并引用接口尺寸图。' },
        { key: 'included_key_sizes', label: '套装键位与补键清单', type: 'textarea', required: true, placeholder: '列出各尺寸键帽数量、空格键和特殊补键；可引用清单附件。' },
        { key: 'declared_switch_fit', label: '声明适配的轴体型号及版本', type: 'textarea', required: true, hint: '说明已知的轴心、行程或壳体干涉限制。' },
        { key: 'legend_and_lighting', label: '字符、透光与灯位要求', type: 'textarea', required: false, placeholder: '说明字符位置、透光方式，以及对灯位或灯光方向的要求。' },
        { key: 'artwork_rights', label: '图案与字体授权说明', type: 'textarea', required: true, hint: '原创、获得授权或无图案均请明确说明；授权材料在附件区提供。' }
      ]
    },
    {
      id: 'switches',
      label: '轴体',
      fields: [
        { key: 'switch_structure', label: '轴体结构与轴心接口', type: 'textarea', required: true, placeholder: '说明轴体结构、轴心接口、壳体及主要部件材质。' },
        { key: 'magnet_specification', label: '磁铁规格与安装位置', type: 'textarea', required: true, hint: '说明磁铁材料、规格、安装位置，并引用相关图纸或资料。' },
        { key: 'magnetic_polarity', label: '磁极方向与判定基准', type: 'textarea', required: true, hint: '写明观察方向和磁极方向，避免只填写“正极”或“反极”。' },
        { key: 'force_and_travel', label: '压力与行程参数', type: 'textarea', required: true, placeholder: '填写起始压力、触底压力、总行程及其单位，附测量或测试条件。' },
        { key: 'declared_pcb_versions', label: '声明适配的 PCBA 型号及版本', type: 'textarea', required: true, hint: '按具体 PCBA 型号、硬件版本逐项填写；传感属性由对应 PCBA 决定。' },
        { key: 'firmware_calibration', label: '适配固件版本与校准要求', type: 'textarea', required: true, placeholder: '填写适配固件版本、校准步骤，以及需要限制的功能或参数。' },
        { key: 'mounting_constraints', label: '定位板与安装限制', type: 'textarea', required: true, placeholder: '说明开孔、卡扣、安装方向和干涉限制。' },
        { key: 'switch_test_evidence', label: '自测条件与结果说明', type: 'textarea', required: false, hint: '列出测试使用的 PCBA、固件、样品批次和报告附件名称。自测结果不代表平台验证。' }
      ]
    },
    {
      id: 'plate',
      label: '定位板',
      fields: [
        { key: 'plate_material', label: '材质与加工工艺', type: 'text', required: true, placeholder: '填写材料牌号或材料说明，以及加工和表面处理方式。' },
        { key: 'cutout_layout', label: '开孔配列与图纸索引', type: 'textarea', required: true, hint: '说明固定配列或可变配列，列出开孔图纸编号及版本。' },
        { key: 'plate_mounting', label: '安装结构与固定件', type: 'textarea', required: true, placeholder: '说明安装方式、固定点、所需垫片或紧固件。' },
        { key: 'declared_switch_fit', label: '声明适配的轴体型号及版本', type: 'textarea', required: true, placeholder: '填写具体型号及卡扣、插装要求。' },
        { key: 'stabilizer_support', label: '卫星轴安装方式与适配说明', type: 'textarea', required: true, placeholder: '说明支持的安装方式、型号，以及特殊键位限制。' },
        { key: 'declared_shell_pcb_fit', label: '声明适配的外壳与 PCBA 组合', type: 'textarea', required: true, hint: '分别填写外壳和 PCBA 型号、版本，列出必须配套使用的组合。' },
        { key: 'flex_and_clearance', label: '开槽结构与干涉限制', type: 'textarea', required: false, placeholder: '说明形变开槽、局部支撑或装配干涉位置。' }
      ]
    },
    {
      id: 'pcb',
      label: 'PCBA',
      fields: [
        { key: 'sensor_attribute', label: '此版本 PCBA 的固定传感属性', type: 'select', required: true, options: ['Hall（霍尔）', 'TMR'], hint: '该属性随 PCBA 型号与硬件版本固定，不作为消费者独立切换的选项；不同方案请分别提交。' },
        { key: 'connection_modes', label: '连接方式与通信功能', type: 'textarea', required: true, placeholder: '填写实际支持的有线或无线连接方式，以及接收器等配套要求。' },
        { key: 'port_and_daughterboard', label: '接口、子板与连接定义', type: 'textarea', required: true, hint: '说明接口位置、连接器、引脚定义、子板与线材配套，引用图纸版本。' },
        { key: 'firmware_support', label: '固件版本、配置工具与更新方式', type: 'textarea', required: true, placeholder: '填写送样固件版本、配置工具、支持的系统及更新方式。' },
        { key: 'declared_switch_versions', label: '声明适配的轴体型号及版本', type: 'textarea', required: true, hint: '逐项填写轴体型号、版本与已知限制；供应商声明需由平台另行验证。' },
        { key: 'sensor_calibration', label: '校准步骤与使用限制', type: 'textarea', required: true, placeholder: '说明首次使用、换轴或更新固件后的校准要求，以及功能限制。' },
        { key: 'power_requirements', label: '供电及电池配套要求', type: 'textarea', required: true, placeholder: '填写供电方式及要求；如支持电池，说明连接、保护和配套条件。' },
        { key: 'declared_mechanical_fit', label: '声明适配的外壳与定位板', type: 'textarea', required: true, placeholder: '填写型号、版本、安装结构及必须配套的组件。' },
        { key: 'supported_features', label: '功能清单与自测依据', type: 'textarea', required: false, hint: '填写实际提供的功能、适用固件及自测条件；报告在附件区提供。' }
      ]
    },
    {
      id: 'stabilizers',
      label: '卫星轴',
      fields: [
        { key: 'stabilizer_mounting', label: '安装方式与固定结构', type: 'text', required: true, placeholder: '填写板载、螺丝固定等实际安装方式。' },
        { key: 'supported_key_sizes', label: '支持键位与套装配置', type: 'textarea', required: true, placeholder: '列出适用键位、规格、数量及随附部件。' },
        { key: 'stabilizer_material', label: '主体、轴心与钢丝材质', type: 'textarea', required: true, placeholder: '分别说明各部件材质及表面处理。' },
        { key: 'declared_plate_pcb_fit', label: '声明适配的定位板与 PCBA', type: 'textarea', required: true, hint: '填写型号及版本，并引用对应安装开孔或固定要求。' },
        { key: 'stem_and_keycap_fit', label: '键帽接口与适配限制', type: 'textarea', required: true, placeholder: '说明接口结构、键帽要求及已知干涉情况。' },
        { key: 'lubrication_and_assembly', label: '润滑与装配说明', type: 'textarea', required: false, placeholder: '说明出厂润滑状态、安装步骤，以及不可使用的材料或操作。' }
      ]
    },
    {
      id: 'foam',
      label: '填充材料',
      fields: [
        { key: 'foam_position', label: '安装位置与用途', type: 'textarea', required: true, placeholder: '说明夹心、轴下、底部等实际安装位置及用途。' },
        { key: 'foam_material', label: '材料、密度与结构', type: 'textarea', required: true, hint: '填写已知材料参数和单位；缺少测试数据时请明确说明。' },
        { key: 'cutout_reference', label: '开孔结构与图纸索引', type: 'textarea', required: true, placeholder: '填写图纸编号、版本及必须避让的部件位置。' },
        { key: 'declared_component_fit', label: '声明适配的配件组合', type: 'textarea', required: true, placeholder: '填写外壳、PCBA、定位板等相关型号及版本。' },
        { key: 'installation_method', label: '安装、粘接与拆卸方式', type: 'textarea', required: true, placeholder: '说明固定方式、背胶、压缩或拆卸要求。' },
        { key: 'electrical_clearance', label: '电气与装配限制', type: 'textarea', required: true, hint: '说明绝缘、导电、静电或散热相关已知限制，以及禁止覆盖的区域；无资料时请注明待补充。' },
        { key: 'material_test_evidence', label: '材料测试或证明说明', type: 'textarea', required: false, placeholder: '列出已有测试的项目、条件及对应附件；无需填写未取得的结论。' }
      ]
    },
    {
      id: 'accessories',
      label: '装饰配件',
      fields: [
        { key: 'accessory_use', label: '配件类型与安装位置', type: 'text', required: true, placeholder: '填写装饰牌、旋钮、挂件等实际类型及安装位置。' },
        { key: 'accessory_material', label: '材质、结构与表面工艺', type: 'textarea', required: true, placeholder: '说明主要材质、结构及表面处理。' },
        { key: 'accessory_mounting', label: '固定方式与配套部件', type: 'textarea', required: true, placeholder: '说明螺丝、卡扣、磁吸或粘贴等固定方式及所需部件。' },
        { key: 'declared_product_fit', label: '声明适配的产品型号及版本', type: 'textarea', required: true, hint: '填写具体型号、版本和安装条件，不只填写配列。' },
        { key: 'function_and_clearance', label: '功能与干涉限制', type: 'textarea', required: true, placeholder: '说明实际功能、可活动范围及已知干涉情况；纯装饰请注明。' },
        { key: 'artwork_rights', label: '图案、标识与造型授权说明', type: 'textarea', required: true, hint: '说明原创或授权来源；如不涉及请注明，证明材料在附件区提供。' }
      ]
    },
    {
      id: 'cable',
      label: '连接线',
      fields: [
        { key: 'connector_types', label: '两端接口与连接器型号', type: 'textarea', required: true, placeholder: '分别写明两端接口、连接器和转接件。' },
        { key: 'data_power_support', label: '数据传输与供电能力', type: 'textarea', required: true, hint: '填写实际支持的功能、额定参数、单位及测试依据；勿仅依据接口外形判断。' },
        { key: 'cable_construction', label: '线芯、屏蔽与外被结构', type: 'textarea', required: true, placeholder: '说明线芯、屏蔽、外被及编织等结构。' },
        { key: 'cable_layout', label: '线材形态与使用长度说明', type: 'textarea', required: true, placeholder: '填写直线、卷线、分体等形态，并说明有效使用长度的测量方式。' },
        { key: 'declared_device_fit', label: '声明适配的 PCBA 或设备', type: 'textarea', required: true, hint: '填写具体型号和版本，说明接口开孔或插头安装限制。' },
        { key: 'detachable_connection', label: '可拆连接段与互换限制', type: 'textarea', required: false, placeholder: '如有分体连接，说明连接定义、配套要求及不可互换的情况。' },
        { key: 'cable_test_evidence', label: '线材测试与使用限制', type: 'textarea', required: false, placeholder: '说明已有测试项目、弯折或插拔限制，以及对应附件。' }
      ]
    },
    {
      id: 'packaging',
      label: '收纳包装',
      fields: [
        { key: 'packaging_use', label: '包装类型与使用场景', type: 'text', required: true, placeholder: '填写收纳包、运输包装、零售包装等实际类型。' },
        { key: 'packaging_material', label: '外部与内衬材料', type: 'textarea', required: true, placeholder: '分别说明外壳、面料、缓冲材料及内衬。' },
        { key: 'declared_contents_fit', label: '声明可容纳的产品与配件', type: 'textarea', required: true, hint: '填写产品型号、版本、数量及是否需要拆卸部件。' },
        { key: 'retention_and_layout', label: '内部布局与固定方式', type: 'textarea', required: true, placeholder: '说明键盘、线材及附件的放置位置、固定方式和避让要求。' },
        { key: 'closure_and_protection', label: '闭合结构与防护说明', type: 'textarea', required: true, hint: '描述实际结构及已有测试依据，未测试的防护性能请明确注明。' },
        { key: 'printing_and_rights', label: '印刷、标识与授权说明', type: 'textarea', required: false, placeholder: '说明可提供的印刷内容、标识及其授权来源。' },
        { key: 'transport_storage_limits', label: '运输、堆放与储存限制', type: 'textarea', required: false, placeholder: '填写已知运输、堆放和储存条件，引用已有测试报告或包装说明。' }
      ]
    }
  ]
};
