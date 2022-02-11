var Enum = {
  'jsyh': "建行卡",
  'gsyh': "工行卡",
  'nyyh': "农行卡"
};
var EnumClassName = {
  'jsyh': 'jsyh',
  'gsyh': 'gsyh',
  'nyyh': 'nyyh'
};
Component({
  data: {
    card: '',
    className: ''
  },
  props: {
    type: '',
    size: 'normal',
    high: '',
    low: ''
  },
  didMount: function didMount() {
    var card = '';
    var className = '';

    switch (this.props.type) {
      case 'jsyh':
        card = Enum['jsyh']; // 建行

        className = EnumClassName['jsyh'];
        break;

      case 'gsyh':
        card = Enum['gsyh']; // 工行

        className = EnumClassName['gsyh'];
        break;

      case 'nyyh':
        card = Enum['nyyh']; // 农行

        className = EnumClassName['nyyh'];
        break;
    }

    if (this.props.size === 'large') className += ' large';
    this.setData({
      card: card,
      className: className
    });
  },
  methods: {}
});