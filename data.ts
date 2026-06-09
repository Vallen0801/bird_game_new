import { BirdData, Ending } from './types';

// Helper to find max score key
const getTopScoreKeyGroup = (scores: Record<string, number>, keys: string[]) => {
  let max = -1;
  let topKeys: string[] = [];
  keys.forEach(key => {
    const val = scores[key] || 0;
    if (val > max) {
      max = val;
      topKeys = [key];
    } else if (val === max) {
      topKeys.push(key);
    }
  });
  return topKeys;
};

const part1: any[] = [
  {
    id: 'sparrow',
    name: '麻雀',
    quote: '小小一只，饭点很准',
    description: '你不大，也不华丽，但你总能在生活的缝里找到一点吃的。',
    isPlayable: true,
    takeoffText: [
      '体型不大，饭点很准。',
      '生活不豪华，但总能在城市缝里抠出一点活路。',
      '接下来，你会经历麻雀的一天。',
      '食物、同伴、人类、玻璃、夜晚——',
      '每一步都不大，',
      '但每一步都决定你最后会飞向哪里。'
    ],
    nodes: [
      {
        id: 1,
        title: '醒来之后',
        sceneText: ['你醒在一台空调外机旁边。', '昨晚风很大，小窝有点松了。', '楼下早餐店快开门了，城市也快醒了。'],
        imageUrl: '/sparrow_node1.jpg',
        choices: [
          { id: '1A', text: '先把小窝修一修', scores: { 'nest': 2 }, feedbackImage: '/sparrow_1_1.jpg', feedbackText: ['你把松掉的草梗重新塞了回去。', '风还在吹，但窝稳了一点。'] },
          { id: '1B', text: '先下楼找点吃的', scores: { 'breadcrumb': 1 }, feedbackImage: '/sparrow_1_2.jpg', feedbackText: ['你从空调外机边一跃而下。', '今天的第一口饭，得靠自己找。'] },
          { id: '1C', text: '叫两声看看有没有同伴', scores: { 'team': 1 }, feedbackImage: '/sparrow_1_3.jpg', feedbackText: ['你试着叫了两声。', '不远处，好像真的有小动静回应你。'] }
        ]
      },
      {
        id: 2,
        title: '早餐出现了',
        sceneText: ['楼下长椅边掉了一点面包屑。', '一只鸽子已经非常自信地走了过去。', '你体型不大，但启动速度很快。'],
        imageUrl: '/sparrow_node2.jpg',
        choices: [
          { id: '2A', text: '立刻冲过去', scores: { 'breadcrumb': 1 }, feedbackImage: '/sparrow_2_1.jpg', feedbackText: ['你冲得很快。', '快到鸽子还没反应过来，你已经开始紧张了。'] },
          { id: '2B', text: '等鸽子先试试', scores: { 'citySurvivor': 1 }, feedbackImage: '/sparrow_2_2.jpg', feedbackText: ['你没有急着动。', '有些食物，等大体型选手先测试一下更安心。'] },
          { id: '2C', text: '叫朋友一起来捡', scores: { 'team': 1 }, feedbackImage: '/sparrow_2_3.jpg', feedbackText: ['你一叫，旁边两只麻雀也凑了过来。', '场面突然从捡饭变成团建。'] }
        ]
      },
      {
        id: 3,
        title: '人类靠近了',
        sceneText: ['一个小孩发现了你，蹲下来喊“小鸟小鸟！”', '他手里拿着一块饼干，眼神很认真。', '你不讨厌人类，但你知道他们经常离得太近。'],
        imageUrl: '/sparrow_node3.jpg',
        choices: [
          { id: '3A', text: '靠近一点看看', scores: { 'breadcrumb': 1, 'risk': 1 }, feedbackImage: '/sparrow_3_1.jpg', feedbackText: ['你往前挪了半步。', '饼干确实很香，但人类的手也越来越近了。'] },
          { id: '3B', text: '保持距离继续观察', scores: { 'citySurvivor': 1 }, feedbackImage: '/sparrow_3_2.jpg', feedbackText: ['你没有走近，只在安全的位置歪头看着。', '香味还在，距离也还在。'] },
          { id: '3C', text: '跳到树枝上提醒一下同伴', scores: { 'team': 1 }, feedbackImage: '/sparrow_3_3.jpg', feedbackText: ['你一下跳上旁边树枝，顺便叫了两声。', '不远处的麻雀也跟着警觉起来。'] }
        ]
      },
      {
        id: 4,
        title: '城市里的“天空”',
        sceneText: ['你飞到一栋商场旁边。', '前面有一整片亮亮的蓝色。', '那里映着云、树和光，像一片安静得过分的天空。'],
        imageUrl: '/sparrow_node4.jpg',
        choices: [
          { id: '4A', text: '直接飞过去', scores: { 'risk': 2 }, feedbackImage: '/sparrow_4_1.jpg', feedbackText: ['你鼓起勇气，朝那片“天空”飞了过去。', '很快你发现，那只是冰冷的玻璃。'] },
          { id: '4B', text: '向旁边绕开飞', scores: { 'citySurvivor': 2 }, feedbackImage: '/sparrow_4_2.jpg', feedbackText: ['你没有直冲过去，而是压低身体，向旁边绕开。', '有些看起来像路的东西，可能根本不是路。'] },
          { id: '4C', text: '叫同伴也停一下', scores: { 'team': 1, 'citySurvivor': 1 }, feedbackImage: '/sparrow_4_3.jpg', feedbackText: ['你急叫了两声。', '后面那只小麻雀也跟着慢了下来。'] }
        ]
      },
      {
        id: 5,
        title: '傍晚落脚',
        sceneText: ['天快黑了，城市一盏一盏亮起来。', '你需要决定今晚停在哪里。', '窝、窗台、树枝——每个地方都不完全一样。'],
        imageUrl: '/sparrow_node5.jpg',
        choices: [
          { id: '5A', text: '回到空调外机旁的小窝', scores: { 'nest': 2 }, feedbackImage: '/sparrow_5_1.jpg', feedbackText: ['你回到了熟悉的位置。', '不算豪华，但至少是你今天亲手修过的地方。'] },
          { id: '5B', text: '去人类窗台边待一晚', scores: { 'risk': 1 }, feedbackImage: '/sparrow_5_2.jpg', feedbackText: ['窗边有光，也有热气。', '只是离人类近的地方，往往也更难完全放松。'] },
          { id: '5C', text: '和同伴挤在树上', scores: { 'team': 2 }, feedbackImage: '/sparrow_5_3.jpg', feedbackText: ['树枝有点挤，也有点吵。', '但一群麻雀挨在一起，夜里总会安心一点。'] }
        ]
      }
    ],
    endings: [
      {
        id: 'sparrow_1',
        name: '面包屑短跑冠军',
        type: 'Funny Ending',
        text: ['你以为自己是麻雀，', '其实你是城市早餐争夺战里的短跑选手。', '你冲向面包屑，', '被鸽子挤开，', '被小孩吓飞，', '最后只抢到一粒芝麻。', '但没关系。', '你已经决定明天继续参赛。'],
        achievement: '输得很小，饿得很认真。'
      },
      {
        id: 'sparrow_2',
        name: '小窝修补员',
        type: 'True Ending',
        text: ['你没有飞到很远的地方，', '也没有抢到最大块的面包。', '但你把松掉的小窝重新塞紧了。', '空调外机不算森林，塑料绳也不算树枝，', '可今晚风吹来的时候，', '你终于有了一个不会立刻散掉的地方。'],
        achievement: '今天也把生活修好了。'
      },
      {
        id: 'sparrow_3',
        name: '玻璃天空',
        type: 'Care Ending',
        text: ['你看见一整片蓝色。', '没有树枝，没有电线，', '没有任何东西挡住你。', '你以为那是天空。', '于是你像每一次飞向天空那样飞过去。', '直到天空没有接住你。'],
        achievement: '玻璃天空',
        careMessage: '请在玻璃上留一点让小鸟看得见的破绽。'
      },
      {
        id: 'sparrow_4',
        name: '城市缝隙生存专家',
        type: 'Normal Ending',
        text: ['你没有相信每一块免费的食物，', '也没有冲向每一片看起来像天空的蓝色。', '你知道鸽子什么时候能当试探员，', '知道人类的手什么时候离得太近，', '也知道商场那片蓝色有点不对劲。', '你不是最大胆的小鸟，', '但你很会活。'],
        achievement: '小小一只，安全第一。'
      },
      {
        id: 'sparrow_5',
        name: '广场临时小队长',
        type: 'Normal Ending',
        text: ['你叫来了三只麻雀。', '三只麻雀又叫来了五只麻雀。', '最后你们成功把长椅下的面包屑，', '分成了一个很不公平但很热闹的下午。', '没有谁真的吃饱，', '但大家都觉得自己参与了大事。'],
        achievement: '一只鸟很小，一群鸟很吵。'
      }
    ],
    evaluateEnding: (scores, history, endings) => {
      const risk = scores['risk'] || 0;
      if (risk >= 3) {
        return endings.find(e => e.id === 'sparrow_3')!;
      }
      const tracks = ['citySurvivor', 'nest', 'team', 'breadcrumb'];
      const tops = getTopScoreKeyGroup(scores, tracks);
      const top = tops[0];
      if (top === 'citySurvivor') return endings.find(e => e.id === 'sparrow_4')!;
      if (top === 'nest') return endings.find(e => e.id === 'sparrow_2')!;
      if (top === 'team') return endings.find(e => e.id === 'sparrow_5')!;
      return endings.find(e => e.id === 'sparrow_1')!;
    }
  },
  {
    id: 'spotted_dove',
    name: '珠颈斑鸠',
    quote: '慢半拍的观察者',
    description: '你看起来总是慢半拍。\n不急着抢，不急着解释，\n只是偶尔在某个下午，认真地咕咕两声。',
    isPlayable: true,
    takeoffText: [
      '你看起来总是慢半拍。',
      '不急着抢，不急着解释，',
      '只是偶尔在某个下午，认真地咕咕两声。',
      '接下来，你会经历珠颈斑鸠的一天。',
      '树枝、草籽、窗台、修剪机和傍晚的灯光——',
      '每一步都不激烈，',
      '但每一步都在决定你今天会落在哪里。'
    ],
    nodes: [
      {
        id: 1,
        title: '醒在小区树上',
        sceneText: ['你醒在香樟树的枝杈上。', '太阳刚照到脖子，楼下的人类已经拎着早餐走过。', '小区的一天，从很轻的脚步声里开始。'],
        imageUrl: '/spotted_dove_node1.jpg',
        choices: [
          { id: '1A', text: '先咕咕两声，看看世界有没有回应', scores: { 'coo': 1 }, feedbackImage: '/spotted_dove_1_1.jpg', feedbackText: ['你咕咕了两声。', '世界没有立刻回答你，但树叶轻轻动了一下。'] },
          { id: '1B', text: '抖抖羽毛，晒一会儿太阳再说', scores: { 'slowLife': 1 }, feedbackImage: '/spotted_dove_1_2.jpg', feedbackText: ['你没有急着起飞。', '阳光落在脖子上，今天可以先慢一点开始。'] },
          { id: '1C', text: '飞到草坪边，看看有没有碎籽可以捡', scores: { 'seedResearcher': 1 }, feedbackImage: '/spotted_dove_1_3.jpg', feedbackText: ['你飞到草坪边，低头找了找。', '世界很大，但早餐通常藏在很小的地方。'] }
        ]
      },
      {
        id: 2,
        title: '巢有点松了',
        sceneText: ['你回头看了看自己的小巢。', '几根树枝歪在一起，看起来很随缘。', '风一吹，它们就轻轻晃了晃。'],
        imageUrl: '/spotted_dove_node2.jpg',
        choices: [
          { id: '2A', text: '图省事，把树枝架到阳台花盆旁边', scores: { 'pruningRisk': 1, 'boundaryObserver': 1 }, feedbackImage: '/spotted_dove_2_1.jpg', feedbackText: ['阳台花盆边看起来平稳，又离人类很近。', '你觉得这里也许能暂时借住一下。'] },
          { id: '2B', text: '去老树杈那里慢慢补一补', scores: { 'slowLife': 2 }, feedbackImage: '/spotted_dove_2_2.jpg', feedbackText: ['你叼起一根细枝，慢慢放回老树杈里。', '不算完美，但比刚才稳了一点。'] },
          { id: '2C', text: '去草坪上挑几根细枝，顺便找点吃的', scores: { 'seedResearcher': 2 }, feedbackImage: '/spotted_dove_2_3.jpg', feedbackText: ['你在草坪边走走停停。', '一边挑树枝，一边顺便研究每一粒像食物的小东西。'] }
        ]
      },
      {
        id: 3,
        title: '窗台上的人类',
        sceneText: ['你落到一户人家的窗台边。', '里面的人类对着电脑发呆，咖啡已经凉了。', '他没有看你，你也没有急着飞走。'],
        imageUrl: '/spotted_dove_node3.jpg',
        choices: [
          { id: '3A', text: '站在窗台边咕咕，给他一点环境音', scores: { 'coo': 2 }, feedbackImage: '/spotted_dove_3_1.jpg', feedbackText: ['你咕咕了两声。', '里面的人类终于抬了一下头，像是被一段很短的背景音乐提醒了。'] },
          { id: '3B', text: '隔着窗安静看他把咖啡喝完', scores: { 'boundaryObserver': 2 }, feedbackImage: '/spotted_dove_3_2.jpg', feedbackText: ['你没有靠近，也没有打扰。', '一层玻璃隔开你们，却也刚好留下了安静的距离。'] },
          { id: '3C', text: '发现花盆土很松，觉得这里也许能搭巢', scores: { 'pruningRisk': 1, 'boundaryObserver': 1 }, feedbackImage: '/spotted_dove_3_3.jpg', feedbackText: ['花盆边柔软、背风，看起来像个不错的位置。', '只是人类的窗台，不一定真的属于一只鸟。'] }
        ]
      },
      {
        id: 4,
        title: '草坪上的机器声',
        sceneText: ['你正在草坪边找草籽。', '不远处，修剪绿化的机器声越来越近。', '草叶在震动，空气里有一点被打碎的绿色味道。'],
        imageUrl: '/spotted_dove_node4.jpg',
        choices: [
          { id: '4A', text: '继续低头找籽，饭不能被噪音耽误', scores: { 'seedResearcher': 1, 'pruningRisk': 1 }, feedbackImage: '/spotted_dove_4_1.jpg', feedbackText: ['你低头继续找着草籽。', '机器声越来越近，你还是想把这一小口吃完。'] },
          { id: '4B', text: '先飞到电线上，等他们走远再回来', scores: { 'slowLife': 1, 'boundaryObserver': 1 }, feedbackImage: '/spotted_dove_4_2.jpg', feedbackText: ['你飞到电线上，先离开那片震动的草坪。', '等声音远一点，也许还可以再回来。'] },
          { id: '4C', text: '站在原地咕咕，表达一点不满', scores: { 'coo': 1, 'pruningRisk': 1 }, feedbackImage: '/spotted_dove_4_3.jpg', feedbackText: ['你站在原地咕咕了两声。', '声音不大，但你确实认真表达过了。'] }
        ]
      },
      {
        id: 5,
        title: '傍晚落在哪里',
        sceneText: ['天慢慢暗下来，小区的灯亮了。', '白天那棵树还在，只是枝条上多了修剪标记。', '你需要决定，今晚落在哪里。'],
        imageUrl: '/spotted_dove_node5.jpg',
        choices: [
          { id: '5A', text: '回到熟悉的小树上，熟悉的地方最安心', scores: { 'pruningRisk': 2 }, feedbackImage: '/spotted_dove_5_1.jpg', feedbackText: ['你回到熟悉的小树上。', '它还是那棵树，只是有些枝条已经变短了。'] },
          { id: '5B', text: '和另一只斑鸠挤到高一点的树杈上', scores: { 'slowLife': 2 }, feedbackImage: '/spotted_dove_5_2.jpg', feedbackText: ['你和另一只斑鸠挤在高一点的树杈上。', '有点窄，但夜色落下来时，靠近一点也很好。'] },
          { id: '5C', text: '落在阳台栏杆外侧，只待一会儿', scores: { 'boundaryObserver': 2 }, feedbackImage: '/spotted_dove_5_3.jpg', feedbackText: ['你落在阳台栏杆外侧，没有进去。', '有些地方可以靠近，但最好不要完全交出去。'] }
        ]
      }
    ],
    endings: [
      {
        id: 'dove_funny',
        name: '咕咕复读机',
        type: 'Funny Ending',
        text: ['你本来只是想咕两声。', '但咕完第一声，你觉得第二声也很有必要。', '楼下的小狗抬头看了看，', '窗里的人类也终于从屏幕前回过神来。', '你不知道自己说了什么，', '但你确定，', '这个下午已经不再完全安静。'],
        achievement: '没什么要说，但必须出声。'
      },
      {
        id: 'dove_true',
        name: '把日子过慢一点',
        type: 'True Ending',
        text: ['你没有飞去很远的地方，', '也没有做出什么惊动小区的大事。', '你只是晒了一会儿太阳，', '补了几根松掉的树枝，', '在傍晚和另一只斑鸠挤在树杈上。', '人类总觉得生活需要很多答案。', '但你觉得，', '今天风不大，树枝还稳，', '就已经很好了。'],
        achievement: '慢慢过，也算认真过。'
      },
      {
        id: 'dove_normal_seed',
        name: '草坪碎籽研究员',
        type: 'Normal Ending',
        text: ['你在草坪边认真低头，', '研究每一粒看起来像食物的小东西。', '有些只是碎石，', '有些是草籽，', '有些可能是人类早餐掉下来的边角料。', '你不挑剔。', '世界给什么，', '你就慢慢啄两下。'],
        achievement: '不求很多，但要刚好够吃。'
      },
      {
        id: 'dove_normal_boundary',
        name: '窗台边界观察员',
        type: 'Normal Ending',
        text: ['你开始习惯那扇窗。', '里面的人类写字、发呆、喝咖啡，', '偶尔也会看向你。', '你不飞进去，', '他也没有伸手抓你。', '你们之间隔着一层透明的距离。', '这一次，', '它不是陷阱，', '而是一条刚刚好的边界。'],
        achievement: '靠近一点，但不属于谁。'
      },
      {
        id: 'dove_care',
        name: '被修剪掉的下午',
        type: 'Care Ending',
        text: ['你用几根树枝，', '把今天暂时安放在一个看起来还不错的地方。', '那里离人类很近，', '离灯也很近，', '离“整洁”这件事也很近。', '下午，树枝被修剪，花盆被清理，', '你叼来的小东西散了一地。', '你站在不远处，', '第一次发现，', '不是所有被整理过的地方，都还能住下小鸟。'],
        achievement: '人类修剪了你的树枝',
        careMessage: '修剪树枝前，也许可以先看看有没有一个很小的家。'
      }
    ],
    evaluateEnding: (scores, history, endings) => {
      const risk = scores['pruningRisk'] || 0;
      if (risk >= 3) {
        return endings.find(e => e.id === 'dove_care')!;
      }
      
      const tracks = ['boundaryObserver', 'slowLife', 'seedResearcher', 'coo'];
      const tops = getTopScoreKeyGroup(scores, tracks);
      const top = tops[0];
      
      if (top === 'boundaryObserver') return endings.find(e => e.id === 'dove_normal_boundary')!;
      if (top === 'slowLife') return endings.find(e => e.id === 'dove_true')!;
      if (top === 'seedResearcher') return endings.find(e => e.id === 'dove_normal_seed')!;
      if (top === 'coo') return endings.find(e => e.id === 'dove_funny')!;
      
      return endings.find(e => e.id === 'dove_true')!;
    }
  },
  {
    id: 'pigeon',
    name: '鸽子',
    quote: '公共空间熟练用户',
    description: '你不需要被邀请。哪里有人类，哪里就有你的公共空间。',
    isPlayable: true,
    takeoffText: [
      '大大方方，从不避让。',
      '这座城市在你脚下，就是一张巨大的免费餐桌。',
      '接下来，你会经历鸽子的一天。',
      '人群里闪转腾挪是基本功，',
      '但今天你打算怎么飞？'
    ],
    nodes: [
      {
        id: 1,
        title: '广场巡逻',
        sceneText: ['你走在广场的地砖上。人类从你旁边绕开，而你走得非常理直气壮。你决定：'],
        imageUrl: '/Pigeon_node1.jpg',
        choices: [
          { id: '1A', text: '继续走在正中间，这条路今天归你管', scores: { '广场合法继承人': 1 }, feedbackImage: '/Pigeon_1_1.jpg', feedbackText: ['你挺起胸膛，继续往前走。', '这片广场对你来说就像自家一样自在。'] },
          { id: '1B', text: '挪到花坛边，和人类保持一点距离', scores: { '城市老住户': 1 }, feedbackImage: '/Pigeon_1_2.jpg', feedbackText: ['你稍微挪了挪位置。', '保持距离是这座城市里古老而有效的生存智慧。'] },
          { id: '1C', text: '叫两只同伴过来，一起巡视地面情况', scores: { '鸽群临时委员会': 1 }, feedbackImage: '/Pigeon_1_3.jpg', feedbackText: ['你咕咕叫了两声。', '几道灰色的身影迅速降落在你身旁。'] }
        ]
      },
      {
        id: 2,
        title: '面包雨来了',
        sceneText: ['长椅旁，有人类掰开一袋白面包。碎屑落地的一瞬间，周围的鸽子都抬起了头。你决定：'],
        imageUrl: '/Pigeon_node2.jpg',
        choices: [
          { id: '2A', text: '第一个冲上去，先到先得', scores: { '广场合法继承人': 1, '好意过量风险': 1 }, feedbackImage: '/Pigeon_2_1.jpg', feedbackText: ['你像离弦的箭一样冲了出去。', '在抢饭这件事上，犹豫就会败北。'] },
          { id: '2B', text: '看一眼“请勿投喂”的牌子，转头去找草籽', scores: { '城市老住户': 1, '站牌观察员': 1 }, feedbackImage: '/Pigeon_2_2.jpg', feedbackText: ['你瞥了一眼牌子，转过身。', '人类的食物有时候太油腻了，还是自然植物稳妥。'] },
          { id: '2C', text: '叫同伴一起来，热闹才像吃饭', scores: { '鸽群临时委员会': 1, '好意过量风险': 1 }, feedbackImage: '/Pigeon_2_3.jpg', feedbackText: ['你呼唤了同伴。', '大家一起吃，饭好像都变香了。'] }
        ]
      },
      {
        id: 3,
        title: '站牌顶上',
        sceneText: ['你飞到公交站牌顶上。下面是人流、车流、掉落的食物和一群举着手机的人类。你决定：'],
        imageUrl: '/Pigeon_node3.jpg',
        choices: [
          { id: '3A', text: '站高一点，先观察哪里最安全', scores: { '站牌观察员': 2 }, feedbackImage: '/Pigeon_3_1.jpg', feedbackText: ['你站在高处俯视。', '城市的脉络在你眼前清晰起来。'] },
          { id: '3B', text: '看准一块掉落的煎饼边，俯冲下去', scores: { '广场合法继承人': 1 }, feedbackImage: '/Pigeon_3_2.jpg', feedbackText: ['你收拢起翅膀，一个精准的俯冲。', '今天的点心有着落了。'] },
          { id: '3C', text: '扑棱一下翅膀，带同伴集体换个方向', scores: { '鸽群临时委员会': 2 }, feedbackImage: '/Pigeon_3_3.jpg', feedbackText: ['你带领大家转换了阵地。', '有时候，最好的防守就是集体转移。'] }
        ]
      },
      {
        id: 4,
        title: '镜头靠近了',
        sceneText: ['一个小孩蹲下来拍你。镜头越来越近，旁边有人说：“它真的不怕人诶。”你决定：'],
        imageUrl: '/Pigeon_node4.jpg',
        choices: [
          { id: '4A', text: '歪头营业一下，保持城市明星风度', scores: { '广场合法继承人': 1, '好意过量风险': 1 }, feedbackImage: '/Pigeon_4_1.jpg', feedbackText: ['你甚至主动迎向了镜头。', '一点小小的人类关注，你早就习以为常。'] },
          { id: '4B', text: '退半步，看可以看，不要伸手', scores: { '城市老住户': 2 }, feedbackImage: '/Pigeon_4_2.jpg', feedbackText: ['你警惕地退后了。', '虽然可以看，但是保持距离对大家都好。'] },
          { id: '4C', text: '突然起飞，让整排鸽子一起扑棱起来', scores: { '鸽群临时委员会': 1, '站牌观察员': 1 }, feedbackImage: '/Pigeon_4_3.jpg', feedbackText: ['扑啦啦！', '一瞬间的集体起飞，甚至吓了那个人类一跳。'] }
        ]
      },
      {
        id: 5,
        title: '塑料袋里的晚餐',
        sceneText: ['垃圾桶旁边有一只鼓鼓的塑料袋。里面混着薯条、面包、包装纸和一点说不清的香味。你选择：'],
        imageUrl: '/Pigeon_node5.jpg',
        choices: [
          { id: '5A', text: '管它是什么，先吃了再说', scores: { '好意过量风险': 2 }, feedbackImage: '/Pigeon_5_1.jpg', feedbackText: ['香味盖过了一切。', '你只管把能吃的都尝一遍。'] },
          { id: '5B', text: '只叼走能认出来的食物，避开塑料', scores: { '城市老住户': 1, '站牌观察员': 1 }, feedbackImage: '/Pigeon_5_2.jpg', feedbackText: ['你小心翼翼地挑出能吃的部分。', '在城市里觅食，必须学会甄别。'] },
          { id: '5C', text: '叫同伴别挤在这里，换个地方找吃的', scores: { '鸽群临时委员会': 1, '城市老住户': 1 }, feedbackImage: '/Pigeon_5_3.jpg', feedbackText: ['你觉得这里有点复杂。', '与其在这里挑拣，不如带着大家去更清净的地方。'] }
        ]
      }
    ],
    endings: [
      {
        id: 'pigeon_1',
        name: '广场合法继承人',
        type: 'Funny Ending',
        text: ['你走在广场正中央，', '像一位没有经过任命的地面管理员。', '人类从你旁边绕开，', '小孩蹲下来拍你，', '面包屑在你脚边落下。', '你没有占领城市。', '你只是从来没同意过搬走。'],
        achievement: '我不让路，路会自己长出来。'
      },
      {
        id: 'pigeon_2',
        name: '城市老住户',
        type: 'True Ending',
        text: ['你知道哪块砖晒太阳最舒服，', '也知道哪条长椅下面最容易掉东西。', '你不总是靠近人类，', '但也不会完全躲开他们。', '这座城市不是森林，', '却也不只属于人类。', '你在这里住了很久，', '慢慢学会了什么叫刚好的距离。'],
        achievement: '不闯入，也不消失。'
      },
      {
        id: 'pigeon_3',
        name: '好意过量',
        type: 'Bad Ending',
        text: ['今天的食物来得太容易了。', '面包、薯条、饼干碎，', '一块接着一块落在你面前。', '你吃得很快，', '也越来越不想离开人类脚边。', '后来你才发现，', '不是所有被递过来的东西，', '都适合一只鸟吞下去。'],
        achievement: '好意过量',
        careMessage: '喜欢小鸟，不一定要把手里的食物都给它。'
      },
      {
        id: 'pigeon_4',
        name: '站牌观察员',
        type: 'Normal Ending',
        text: ['你喜欢站在高一点的地方。', '站牌顶上、路灯边缘、商场招牌的角落，', '都是观察城市的好位置。', '人流什么时候变多，', '哪边会掉下食物，', '哪里突然出现举着手机的人类，', '你总能比别的鸽子早一点发现。', '你不急着冲进热闹里，', '只是先看看，再决定往哪飞。'],
        achievement: '先观察，再落地。'
      },
      {
        id: 'pigeon_5',
        name: '鸽群临时委员会',
        type: 'Normal Ending',
        text: ['你扑棱了一下翅膀。', '两只鸽子跟着飞了起来。', '然后是十只，二十只，整片广场都响了一下。', '你们没有明确目的地，', '也没有谁真的下达命令。', '但当一群鸽子同时起飞时，', '人类会自动停下脚步，', '抬头看一眼天空。'],
        achievement: '一只鸽子是路人，一群鸽子是事件。'
      }
    ],
    evaluateEnding: (scores, history, endings) => {
      const risk = scores['好意过量风险'] || 0;
      const isRiskPath = history.includes('5A') && (history.includes('2A') || history.includes('2C') || history.includes('4A'));
      
      if (risk >= 3 || isRiskPath) {
        return endings.find(e => e.id === 'pigeon_3')!;
      }
      
      const tracks = ['广场合法继承人', '城市老住户', '站牌观察员', '鸽群临时委员会'];
      const tops = getTopScoreKeyGroup(scores, tracks);
      
      if (tops.length > 1) {
        if (history.includes('3A')) return endings.find(e => e.id === 'pigeon_4')!;
        if (history.includes('4B')) return endings.find(e => e.id === 'pigeon_2')!;
        if (history.includes('3C') || history.includes('4C')) return endings.find(e => e.id === 'pigeon_5')!;
        if (history.includes('1A') || history.includes('4A')) return endings.find(e => e.id === 'pigeon_1')!;
        return endings.find(e => e.id === 'pigeon_2')!;
      }
      
      const top = tops[0];
      if (top === '广场合法继承人') return endings.find(e => e.id === 'pigeon_1')!;
      if (top === '城市老住户') return endings.find(e => e.id === 'pigeon_2')!;
      if (top === '站牌观察员') return endings.find(e => e.id === 'pigeon_4')!;
      if (top === '鸽群临时委员会') return endings.find(e => e.id === 'pigeon_5')!;
      return endings.find(e => e.id === 'pigeon_2')!;
    }
  }
];

const part2: any[] = [
  {
    id: 'pheasant',
    name: '红腹锦鸡',
    quote: '林下华美的巡游者',
    description: '你拥有金红、宝蓝、亮黄交织的华羽。\n你不需要寻找舞台，\n因为你站在哪里，哪里就是开场。',
    isPlayable: true,
    takeoffText: [
      '清晨微弱的日光，穿过古老原始松林细密的针叶。',
      '你从潮湿的灌木深处迈步，红与金的尾羽在昏暗的地表擦出一抹亮光。',
      '你不总是飞翔，因为对你而言，',
      '在这片属于自然的深山走廊里踱步，已经是最高妙的巡游。'
    ],
    nodes: [
      {
        id: 1,
        title: '晨光惊扰了幽谷',
        sceneText: [
          '清晨，微光照亮了林下的落叶层。',
          '你展开斑斓的尾羽站上高高的木桩，冷雾在你呼吸间散开。',
          '今天，你该往哪里去？'
        ],
        imageUrl: '/golden_pheasant_node1.jpg',
        choices: [
          {
            id: '1A',
            text: '沿着林间阳光斑驳的主路骄傲前行，宣示美丽',
            scores: { '羽色即开场': 2 },
            feedbackImage: '/golden_pheasant_1_1.jpg',
            feedbackText: [
              '你迈着优雅的步子走在晨光里，金红鲜亮。',
              '林中的各种鸟类纷纷退避、安静地投来惊叹的目光。'
            ]
          },
          {
            id: '1B',
            text: '钻入光线到不了的灌木深处，暗中巡查小路',
            scores: { '林下巡游路线': 2 },
            feedbackImage: '/golden_pheasant_1_2.jpg',
            feedbackText: [
              '你将艳丽的身形掠入松针与葛藤交织的阴影中。',
              '落叶很软，没有人惊扰，只有露水轻轻打湿你的金冠。'
            ]
          },
          {
            id: '1C',
            text: '发出低沉的啼鸣，呼唤附近的同伴一起前行',
            scores: { '灌木领队': 2 },
            feedbackImage: '/golden_pheasant_1_3.jpg',
            feedbackText: [
              '你叫了两声，灌木丛中很快传来了沙沙的回应。',
              '几只毛茸茸的同伴从隐蔽处钻了出来，准备追随你的步子。'
            ]
          }
        ]
      },
      {
        id: 2,
        title: '松林深处的沙沙声',
        sceneText: [
          '松叶被踩碎的沉闷声音从风中传来。',
          '显然，有人类正在朝这片保护区深处探索。',
          '作为林中最醒目的存在，你决定：'
        ],
        imageUrl: '/golden_pheasant_node2.jpg',
        choices: [
          {
            id: '2A',
            text: '站上显眼的高突岩石，傲然展示自己的身影',
            scores: { '羽色即开场': 1, '漂亮不该被带走风险': 1 },
            feedbackImage: '/golden_pheasant_2_1.jpg',
            feedbackText: [
              '你居高临下立在岩石上，华羽在光下耀眼夺目。',
              '远处的摄像机镜头顿时疯狂地对准了你，人类在兴奋地惊呼。'
            ]
          },
          {
            id: '2B',
            text: '立刻压低长尾，迅速滑进最茂密的杂草缝隙中',
            scores: { '林下巡游路线': 2 },
            feedbackImage: '/golden_pheasant_2_2.jpg',
            feedbackText: [
              '你灵巧地合拢艳羽，身体贴近布满青苔的乱石 and 灌木底。',
              '风吹过，你已无声无息地溶入到自然那大片棕褐与幽绿的底色中。'
            ]
          },
          {
            id: '2C',
            text: '先在前方发出警示的鸣声，向后方同伴发出危险撤退信号',
            scores: { '灌木领队': 2 },
            feedbackImage: '/golden_pheasant_2_3.jpg',
            feedbackText: [
              '你发出一声尖锐短促的哨音，接着振翅惊退！',
              '后方的同伴们听到指令，极快地散入深深的蕨类地毯中，消失得一干二净。'
            ]
          }
        ]
      },
      {
        id: 3,
        title: '亮闪闪的奇怪物件',
        sceneText: [
          '人类留下的空地上，放着一些散落的浆果，还支着几根黑长又发亮的粗大镜筒。',
          '那里的食物看起来很甜，但亮晶晶的圆镜子似乎在盯着你。',
          '你打算：'
        ],
        imageUrl: '/golden_pheasant_node3.jpg',
        choices: [
          {
            id: '3A',
            text: '大步走过去享用浆果，并在镜头前自如地迈步',
            scores: { '漂亮不该被带走风险': 2, '羽色即开场': 1 },
            feedbackImage: '/golden_pheasant_3_1.jpg',
            feedbackText: [
              '果实香甜，而咔哒咔哒的连续快门声也随之激昂响起。',
              '你的每一根华羽都被清晰地记录了下来，人类在隐藏帐里屏住了呼吸。'
            ]
          },
          {
            id: '3B',
            text: '绕着那片空地走，警惕地保持二十步以上的安全距离',
            scores: { '林下巡游路线': 2 },
            feedbackImage: '/golden_pheasant_3_2.jpg',
            feedbackText: [
              '你用侧眼提防着黑色圆筒的折光，步履从容而坚定地绕路前行。',
              '那些隐藏极深的快门只捕捉到了你半遮半掩在绿叶后的金红残影。'
            ]
          },
          {
            id: '3C',
            text: '在灌木后发出警戒鸣，指挥随行的年轻同伴绕开陷阱',
            scores: { '灌木领队': 2 },
            feedbackImage: '/golden_pheasant_3_3.jpg',
            feedbackText: [
              '一两只嘴馋的小锦鸡本来想跑过去捡食物，听到你严厉的警告，立刻缩了回去。',
              '你们安全而有序地跨过了这处看似斑斓的隐蔽陷阱。'
            ]
          }
        ]
      },
      {
        id: 4,
        title: '林顶滑过的庞大黑影',
        sceneText: [
          '林梢的松针沙沙作响，巨大的羽翼阴影一滑而过。',
          '一只饥饿的苍鹰正在低空盘旋，任何移动的鲜艳颜色都可能成为它的目标。',
          '你选择：'
        ],
        imageUrl: '/golden_pheasant_node4.jpg',
        choices: [
          {
            id: '4A',
            text: '抖动全身绚烂耀眼的羽毛，发声吸引它的注意，为同伴争取时间',
            scores: { '羽色即开场': 1, '灌木领队': 1 },
            feedbackImage: '/golden_pheasant_4_1.jpg',
            feedbackText: [
              '你站在树桩上全力舒展五金冠羽，大声发出嘲讽般的清啼！',
              '在苍鹰猛然俯冲下来的刹那，你已顺势滚入满是倒木与乱刺的棘层，全身而退。'
            ]
          },
          {
            id: '4B',
            text: '静立如雕像，在松针堆里将长尾收拢与枯枝平行',
            scores: { '林下巡游路线': 2 },
            feedbackImage: '/golden_pheasant_4_2.jpg',
            feedbackText: [
              '你屏住全身气息，连尾羽的颤动也归于沉寂。',
              '从鹰居高临下的视野里，你只是一块枯干的多色老树桩，庞大的巨影缓缓飞远了。'
            ]
          },
          {
            id: '4C',
            text: '迅速招呼分散的锦鸡，带领它们躲进粗壮的中空树洞',
            scores: { '灌木领队': 2 },
            feedbackImage: '/golden_pheasant_4_3.jpg',
            feedbackText: [
              '你极有威严地发出紧急召集声，将同伴护在身下，逐一塞入结实的安全树洞。',
              '松林高处的厉啸扑空了，而大家在你身后暖意融融地贴在一起。'
            ]
          }
        ]
      },
      {
        id: 5,
        title: '黄昏落叶的尽头',
        sceneText: [
          '夕阳将天空烧得通红，林子的边缘便是人类小镇亮起的繁灯。',
          '微风吹起林下的落叶，也带来了不同的声响 and 气息。',
          '最后，你决定把今晚的脚步落在：'
        ],
        imageUrl: '/golden_pheasant_node5.jpg',
        choices: [
          {
            id: '5A',
            text: '去到小镇边缘的花园假山，在五彩景观灯下傲然闭目休息',
            scores: { '漂亮不该被带走风险': 2, '羽色即开场': 1 },
            feedbackImage: '/golden_pheasant_5_1.jpg',
            feedbackText: [
              '霓虹与路灯把你的金裙照得如同梦境，镇上的居民纷纷走来围观合照。',
              '虽然温暖而耀眼，但在嘈杂的人影笑声里，你整夜都无法真正安心入眠。'
            ]
          },
          {
            id: '5B',
            text: '退回松林最核心处那棵长满松苔的百年老树，独自静隐',
            scores: { '林下巡游路线': 2 },
            feedbackImage: '/golden_pheasant_5_2.jpg',
            feedbackText: [
              '你一步一步隐回深林的怀抱，直到最后一点夕照在你的羽冠上熄灭。',
              '夜晚很冷，落叶在风中起舞，而你拥有整个自由古老林莽的静谧。'
            ]
          },
          {
            id: '5C',
            text: '和几只跟着你一整天的锦鸡同伴挤在暖和的浓密橡副枝上',
            scores: { '灌木领队': 2 },
            feedbackImage: '/golden_pheasant_5_3.jpg',
            feedbackText: [
              '你舒展起宽大的双翼遮风，小锦鸡们暖融融地贴靠在你的金红襟羽下。',
              '在遥远而静默的深林之夜，你们挨在一起，听着针叶林里最沉稳的呼吸。'
            ]
          }
        ]
      }
    ],
    endings: [
      {
        id: 'pheasant_1',
        name: '羽色即开场',
        type: 'True Ending',
        text: [
          '你不需要寻找舞台。',
          '你站在哪里，哪里就是开场。',
          '金红、宝蓝、亮黄，',
          '大自然把最奢侈的颜色都泼在你的身上。',
          '但你并不孤傲。',
          '你抖抖羽毛，在阳光斑驳的空地上走过，',
          '把每一个寻常的清晨，',
          '都变成了一场盛大的林中巡游。'
        ],
        achievement: '羽色即开场 | 不需要迎合，美本来就是你的一部分。'
      },
      {
        id: 'pheasant_2',
        name: '镜头里的标本',
        type: 'Care Ending',
        text: [
          '你走得离人类太近了。',
          '你的红色太绚烂，你的金色太耀眼。',
          '那些冰冷的镜头最终没有放过你。',
          '闪光灯、喧嚣声，甚至是隐藏在暗处的捕网。',
          '你的美丽被装进狭窄的铁笼。',
          '你不再属于自由的林间，',
          '风也吹不到你华美的金羽。'
        ],
        achievement: 'Bad Ending：漂亮不该被带走',
        careMessage: '把美留给自然，不要用镜头和网将它占为己有。'
      },
      {
        id: 'pheasant_3',
        name: '叶子收好颜色',
        type: 'True Ending',
        text: [
          '见远处有脚步声，',
          '也听见叶子里很轻的风。',
          '于是你转过身，',
          '往更深的地方走。',
          '树影一点点盖住羽毛。',
          '亮色还在，',
          '只是不用一直给谁看见。'
        ],
        achievement: '叶子会替你收好颜色 | 真正的华丽，收放自如。'
      },
      {
        id: 'pheasant_4',
        name: '深林守护者',
        type: 'Normal Ending',
        text: [
          '你不是一只鸟在生存。',
          '林木遮蔽了烈日，也遮蔽了不怀好意的双眼。',
          '你用一次次低沉的暖鸣，',
          '引导着同伴在深林幽暗的走廊中前行。',
          '世界也许很少再能在公开的草地上拍到你，',
          '但在灌木错落的交界底，',
          '你是所有小锦鸡最温暖、最可靠的守护者。'
        ],
        achievement: '林下领队 | 华美不仅在羽毛上，也在对同伴的守护中。'
      }
    ],
    evaluateEnding: (scores, history, endings) => {
      const risk = scores['漂亮不该被带走风险'] || 0;
      
      if (risk >= 3 || (history.includes('3A') && history.includes('5A'))) {
        return endings.find(e => e.id === 'pheasant_2')!;
      }
      
      const tracks = ['羽色即开场', '林下巡游路线', '灌木领队'];
      const tops = getTopScoreKeyGroup(scores, tracks);
      
      if (tops.length > 1) {
        if (history.includes('5C')) return endings.find(e => e.id === 'pheasant_4')!;
        if (history.includes('5B')) return endings.find(e => e.id === 'pheasant_3')!;
        if (history.includes('3A') || history.includes('2A')) return endings.find(e => e.id === 'pheasant_1')!;
        return endings.find(e => e.id === 'pheasant_1')!;
      }
      
      const top = tops[0];
      if (top === '林下巡游路线') return endings.find(e => e.id === 'pheasant_3')!;
      if (top === '灌木领队') return endings.find(e => e.id === 'pheasant_4')!;
      return endings.find(e => e.id === 'pheasant_1')!;
    }
  },
  {
    id: 'swallow',
    name: '家燕',
    quote: '剪羽穿入人间',
    description: '每一个春天，你都记得那个在水泥屋檐下的旧约。',
    isPlayable: true,
    takeoffText: [
      '春寒料峭的日光落在一截灰冷的水泥屋檐边。',
      '你低飞而至，剪刀般的尾羽极其灵巧。',
      '你在新拉上的铁线上舒展双翼。',
      '新的一年，你再次回到了人间。'
    ],
    nodes: [
      {
        id: 1,
        title: '旧屋檐下的春天',
        sceneText: [
          '你从遥远的南方飞回。',
          '春天又把熟悉的北方瓦檐和电线交回到你眼前。',
          '但今年这里似乎变得更亮了，许多老屋瓦都成了高高的铁网和光滑的幕墙。',
          '你决定：'
        ],
        imageUrl: '/swallow_node1.jpg',
        choices: [
          {
            id: '1A',
            text: '沿着弄堂里的老瓦顶穿过去，那里的气味最熟悉',
            scores: { '旧风识路': 1 },
            feedbackImage: '/swallow_1_1.jpg',
            feedbackText: [
              '低矮微黄的烟筒里还升着炭火烟。',
              '那股承载了世代繁复的老宅深息，让你在刹那确定，这就是你回家的路。'
            ]
          },
          {
            id: '1B',
            text: '去林子后面的一汪乱泥塘，筑新巢需要最好的黏土',
            scores: { '衔泥未歇': 1 },
            feedbackImage: '/swallow_1_2.jpg',
            feedbackText: [
              '在波光粼粼的溪泡旁落定。',
              '你啄了一小口温润丰满的春泥，哪怕身躯被北来风冻得直颤。'
            ]
          },
          {
            id: '1C',
            text: '飞去热闹的电线上，看看去年一起迁徙的同伴都在哪',
            scores: { '群燕分风': 1 },
            feedbackImage: '/swallow_1_3.jpg',
            feedbackText: [
              '电线整划如黑丝玉琴。',
              '你落在一排闪亮的小身影间。大家低声鸣歌切切，这就是你可靠的群燕之风。'
            ]
          }
        ]
      },
      {
        id: 2,
        title: '寻觅春泥',
        sceneText: [
          '没有巢就谈不上未来。',
          '你想去寻一处好衔的湿软，筑起一个温暖不摇的家。',
          '但四周的新街道都被水泥和沥青压得极其严密，泥土太少。',
          '你决定：'
        ],
        imageUrl: '/swallow_node2.jpg',
        choices: [
          {
            id: '2A',
            text: '回到那口有些古老的砖墙夹缝，去掏泥下的草根黏泥',
            scores: { '旧风识路': 2 },
            feedbackImage: '/swallow_2_1.jpg',
            feedbackText: [
              '你顺着瓦楞深探，旧泥中混有一股醇厚的青苔潮气。',
              '这里虽然少而碎，但有着能让你最踏实的老家味道。'
            ]
          },
          {
            id: '2B',
            text: '去新建广场的喷泉积水边，那里有些平整的绿地和装饰沙泥',
            scores: { '春泥无处': 2, '衔泥未歇': 1 },
            feedbackImage: '/swallow_2_2.jpg',
            feedbackText: [
              '喷池两旁全是冰冷锋亮的花岗石和高高的铁索。',
              '零细的草泥虽然触嘴即得，但硬化的绿茵没有任何可以生息的大地温软。'
            ]
          },
          {
            id: '2C',
            text: '跟着燕群的排翼，飞往更远的外环农田和旷野中去寻',
            scores: { '群燕分风': 2 },
            feedbackImage: '/swallow_2_3.jpg',
            feedbackText: [
              '大股春风推着庞大的队伍极目远翔！',
              '野地的大气在翅边铺展开来，万雀成群在泥泞的畦头寻乐高啼。'
            ]
          }
        ]
      },
      {
        id: 3,
        title: '贴着水面低飞',
        sceneText: [
          '傍晚的飞虫多起来了。',
          '巢还没筑好，但你已经饿了。',
          '你决定：'
        ],
        imageUrl: '/swallow_node3.jpg',
        choices: [
          {
            id: '3A',
            text: '贴着水面低低飞过，抓几只小虫',
            scores: { '衔泥未歇': 2 },
            feedbackImage: '/swallow_3_1.jpg',
            feedbackText: [
              '你掠过波光粼粼的水面。',
              '水纹泛开成层层涟漪。几只小飞虫准确落入你的口中。'
            ]
          },
          {
            id: '3B',
            text: '沿着低低的屋檐侧飞，避开高楼的玻璃幕墙',
            scores: { '旧风识路': 2 },
            feedbackImage: '/swallow_3_2.jpg',
            feedbackText: [
              '你收紧翅膀，轻巧地在昏暗的小巷窄缝里穿行。',
              '避开了那些晃眼冷酷的玻璃巨幕。'
            ]
          },
          {
            id: '3C',
            text: '飞向霓虹灯耀眼的大厦群，那里暖风里飞虫多',
            scores: { '灯误归途': 2 },
            feedbackImage: '/swallow_3_3.jpg',
            feedbackText: [
              '你振翅飞向了流光溢彩的玻璃高楼。',
              '巨大的探照灯和五彩霓虹晃得你有一瞬头晕目眩。'
            ]
          }
        ]
      },
      {
        id: 4,
        title: '寻找安家的一角',
        sceneText: [
          '你在灰冷的水泥屋梁下飞了几个来回。',
          '许多老水泥梁都被新涂了光滑的瓷砖，根本粘不住草根和湿软的春泥。',
          '你决定：'
        ],
        imageUrl: '/swallow_node4.jpg',
        choices: [
          {
            id: '4A',
            text: '拍动湿漉漉的翅膀，在老木廊的角落落脚',
            scores: { '旧风识路': 1, '衔泥未歇': 1 },
            feedbackImage: '/swallow_4_1.jpg',
            feedbackText: [
              '木质的结构有些斑驳粗糙。',
              '但这天然的横梁正是你最定心的港湾。'
            ]
          },
          {
            id: '4B',
            text: '与桥洞底下的其他燕子挤在一起筑个联合巢',
            scores: { '群燕分风': 2 },
            feedbackImage: '/swallow_4_2.jpg',
            feedbackText: [
              '桥洞下虽有些喧噪，但在风雨里，',
              '许多飞燕依偎在一起，也别具温暖的生息。'
            ]
          },
          {
            id: '4C',
            text: '试图把湿泥粘在光滑的玻璃幕墙缝里',
            scores: { '春泥无处': 2 },
            feedbackImage: '/swallow_4_3.jpg',
            feedbackText: [
              '湿透的春泥一抹抹地顺着光滑的玻璃滑落下去。',
              '努力被重力一遍遍瓦解，无处安家。'
            ]
          }
        ]
      },
      {
        id: 5,
        title: '归巢的时分',
        sceneText: [
          '夜色四合，城市的霓虹灯与街灯齐备。',
          '冷白 and 暖黄的强光将天空也照得微微发亮，让人分不清昼夜。',
          '你选择：'
        ],
        imageUrl: '/swallow_node5.jpg',
        choices: [
          {
            id: '5A',
            text: '栖息在老巷子的木椽阴影中，感受夜的安稳',
            scores: { '旧风识路': 2 },
            feedbackImage: '/swallow_5_1.jpg',
            feedbackText: [
              '黑暗而静谧的瓦檐把你完全搂在怀中。',
              '这古老的人家烟火温润得让人沉醉。'
            ]
          },
          {
            id: '5B',
            text: '在宽大光滑的电线队列里，和其他伙伴肩靠肩睡去',
            scores: { '群燕分风': 2 },
            feedbackImage: '/swallow_5_2.jpg',
            feedbackText: [
              '你飞入黑压压却整齐的一列。',
              '密密匝匝的小体温相护，夜间的春寒也在歌声中融化。'
            ]
          },
          {
            id: '5C',
            text: '被远处高耸入画的通明玻璃塔吸引，在强光附近徘徊',
            scores: { '灯误归途': 2 },
            feedbackImage: '/swallow_5_3.jpg',
            feedbackText: [
              '你飞向刺眼闪亮的灯光之塔。',
              '漫天强光遮蔽了星斗，巨大的引力牵引着你的眼眸。'
            ]
          }
        ]
      }
    ],
    endings: [
      {
        id: 'swallow_1',
        name: '灯误归途',
        type: 'Bad Ending',
        text: [
          '夜深了，城市从未睡去。',
          '不计其数的冷白射灯、通明长窗和霓虹路标，',
          '在夜幕里织成了一面看不见的炫目捕网。',
          '你的眼睛开始有些晕眩，',
          '你在那高耸入云的强光附近不断徘徊，',
          '直到翅膀疲惫，',
          '忘记了那个水泥屋檐下的旧窝。',
          '有一些光线太好，',
          '就容易迷失原有的方向。'
        ],
        achievement: '灯误归途 | 有些光太亮，就看不清回家的路了。'
      },
      {
        id: 'swallow_2',
        name: '春泥无处',
        type: 'Bad Ending',
        text: [
          '你掠过一条条光洁平整的高新硬化路面，',
          '喷池旁都是大理石，绿化带上铺满了厚实的砂土。',
          '你想粘起一口湿漉，',
          '却一次次从坚硬冰冷的幕墙和金属边滑落。',
          '泥土太少，而水泥太新。',
          '这世界上闪亮的地方那么广阔，',
          '却没有一个屋廊，',
          '能安放一只企盼小鸟的家。'
        ],
        achievement: '春泥无处 | 当大地被水泥密封，春天也就失去了立足之地。'
      },
      {
        id: 'swallow_3',
        name: '旧风识路',
        type: 'Normal Ending',
        text: [
          '城市变高了，',
          '去年那块阴影也不完全一样。',
          '但风从拐角吹过来时，',
          '你的翅膀先认出了方向。',
          '人类说家是地址。',
          '你觉得，家也可能是一段路——',
          '飞了很远，',
          '还是会在春天想起来。'
        ],
        achievement: '身体记得路 | 飞过很多地方，也没有忘记回来。'
      },
      {
        id: 'swallow_4',
        name: '群燕分风',
        type: 'Normal Ending',
        text: [
          '你没有一只鸟决定所有事。',
          '你们一起绕开玻璃楼，',
          '一起停在电线上等风小一点，',
          '一起找到桥洞下那排细缝。',
          '有时候，路也不一定是对的。',
          '但一群燕子飞过去时，',
          '城市就没有那么大了。',
          '楼下的人类说：',
          '“燕子回来了。”',
          '他们不知道，',
          '回来是很多只小鸟一起记住的事。'
        ],
        achievement: '群燕分风 | 一只鸟会累，一群鸟会把春天带回来。'
      },
      {
        id: 'swallow_5',
        name: '衔泥未歇',
        type: 'True Ending',
        text: [
          '你没有想很远。',
          '找到一点泥，',
          '就叼回去。',
          '抓到一只虫，',
          '就带回去。',
          '巢一点点变圆，',
          '小嘴一天比一天响。',
          '人类总问以后怎么办。',
          '你低头看了看屋檐下的小家，',
          '觉得以后也许就是——',
          '再飞一趟。'
        ],
        achievement: '衔泥未歇 | 不说留下，但每一次回来都很认真。'
      }
    ],
    evaluateEnding: (scores, history, endings) => {
      const scoreLight = scores['灯误归途'] || 0;
      if (scoreLight >= 3 || (history.includes('3C') && history.includes('5C'))) {
        return endings.find(e => e.id === 'swallow_1')!;
      }
      
      const scoreMud = scores['春泥无处'] || 0;
      if (scoreMud >= 3 || (history.includes('2B') && history.includes('4C'))) {
        return endings.find(e => e.id === 'swallow_2')!;
      }
      
      const tracks = ['旧风识路', '群燕分风', '衔泥未歇'];
      const tops = getTopScoreKeyGroup(scores, tracks);
      
      if (tops.length === 1) {
        const top = tops[0];
        if (top === '旧风识路') return endings.find(e => e.id === 'swallow_3')!;
        if (top === '群燕分风') return endings.find(e => e.id === 'swallow_4')!;
        return endings.find(e => e.id === 'swallow_5')!;
      }
      
      if (tops.includes('旧风识路') && (history.includes('1A') || history.includes('5A'))) {
        return endings.find(e => e.id === 'swallow_3')!;
      }
      if (tops.includes('群燕分风') && (history.includes('1C') || history.includes('5B'))) {
        return endings.find(e => e.id === 'swallow_4')!;
      }
      
      return endings.find(e => e.id === 'swallow_5')!;
    }
  },
  {
    id: 'owl',
    name: '北鹰鸮',
    quote: '夜间模式启动',
    description: '白天你像一团没加载完的羽毛，到了晚上，整个世界才终于清楚。',
    isPlayable: true,
    takeoffText: [
      '你醒在一棵树顶。',
      '风吹过雪原。',
      '别的鸟还在低处吵。',
      '你转动视线，看见很远的地方。'
    ],
    nodes: [
      {
        id: 1,
        title: '站在枯树顶',
        sceneText: [
          '你站在白雪皑皑林区中最高的一处枯树梢。',
          '白茫茫的雪原在脚下如白卷般铺开。',
          '其他杂鸟都在低处为浆果大吵大闹，而你只是静静地御风独立。',
          '你决定：'
        ],
        imageUrl: '/northern_hawk_owl_node1.jpg',
        choices: [
          { id: '1A', text: '一动不动，将两只浑圆的大眼睛盯向最遥远的地平线', scores: { '白天也看得很远': 1 }, feedbackImage: '/northern_hawk_owl_1_1.jpg', feedbackText: ['凛风寒冷，但你的视力极佳。', '远处的丝微变化都逃不过你的眼睛。'] },
          { id: '1B', text: '侧耳倾听雪层深处的微小震动', scores: { '雪地有动静': 1 }, feedbackImage: '/northern_hawk_owl_1_2.jpg', feedbackText: ['雪花无声落下。', '但地表覆雪下极细微的窸窣与搏动已传入你敏锐的耳中。'] },
          { id: '1C', text: '往常绿针叶的更深处避一避锋芒', scores: { '林子会收留': 1 }, feedbackImage: '/northern_hawk_owl_1_3.jpg', feedbackText: ['狂风扰乱了蓬松的羽翼。', '厚实的杉树松针层帮你挡住了大半的酷寒。'] }
        ]
      },
      {
        id: 2,
        title: '雪下的呼吸',
        sceneText: [
          '猛然间，树下的雪地有些异样的起伏。',
          '那绝对是一个顽强而微小的哺乳动物踩碎枯枝时带起的震颤。',
          '你决定：'
        ],
        imageUrl: '/northern_hawk_owl_node2.jpg',
        choices: [
          { id: '2A', text: '按捺按住心跳，在最高的梢头保持极度静止继续观察', scores: { '雪地有动静': 2 }, feedbackImage: '/northern_hawk_owl_2_1.jpg', feedbackText: ['等待需要极致的沉静。', '你连羽毛下的毛细孔都静止下来，等待最佳时机。'] },
          { id: '2B', text: '直接振翅起飞，用利爪试探地抓向未知的积雪中', scores: { '像鹰一样出手': 2 }, feedbackImage: '/northern_hawk_owl_2_2.jpg', feedbackText: ['你如同白昼里的灰色箭镞般极速砸落！', '双爪极深地没入冰凉的厚雪中。'] },
          { id: '2C', text: '沿着附近的针叶林地带低空滑翔，扩大侦察领域', scores: { '白天也看得很远': 1, '林子会收留': 1 }, feedbackImage: '/northern_hawk_owl_2_3.jpg', feedbackText: ['风在你两翼鸣响。', '低空盤旋在落叶松和苔原之间，带给你极广的视角。'] }
        ]
      },
      {
        id: 3,
        title: '靠近人类的路',
        sceneText: [
          '这片雪原的边缘有一条笔直硬朗的黑色国道，偶尔有隆隆鸣响、亮着白茫大灯的钢铁机器驶过。',
          '国道旁的电杆和高标牌由于其开阔和高耸，成了观察飞虫的好地方。',
          '你决定：'
        ],
        imageUrl: '/northern_hawk_owl_node3.jpg',
        choices: [
          { id: '3A', text: '落上道边金属高架，那块地方又平又高', scores: { '路边太近风险': 2 }, feedbackImage: '/northern_hawk_owl_3_1.jpg', feedbackText: ['钢标牌宽厚平稳。', '只是下方偶尔划过的射灯白光晃得你微显重影。'] },
          { id: '3B', text: '留在远离柏油路的古松林，从黑暗中冷眼注视凡尘', scores: { '林子会收留': 2 }, feedbackImage: '/northern_hawk_owl_3_2.jpg', feedbackText: ['你处于完美的隐蔽之下。', '幽黑的古木松涛将你严实包容，无尘无险。'] },
          { id: '3C', text: '低低掠过荒地，捕捉被车灯晃出草科的冬虫', scores: { '像鹰一样出手': 1, '路边太近风险': 1 }, feedbackImage: '/northern_hawk_owl_3_3.jpg', feedbackText: ['一些昆虫跟着强光飞落。', '你极轻灵地旋身兜捉，但掠过公路时震耳的声音让你心惊胆战。'] }
        ]
      },
      {
        id: 4,
        title: '看清还是降落',
        sceneText: [
          '你在空中看到了一抹一闪而过的灰色。',
          '那肯定又是雪地底下的松鼠或旅鼠。',
          '但是柏油路上的噪声越来越大。',
          '你面临着决断：'
        ],
        imageUrl: '/northern_hawk_owl_node4.jpg',
        choices: [
          { id: '4A', text: '保持在松树冠层，只用眼睛追踪，不飞下去', scores: { '白天也看得很远': 1 }, feedbackImage: '/northern_hawk_owl_4_1.jpg', feedbackText: ['你选择留在边界之内。', '退一步亦能海阔天空。'] },
          { id: '4B', text: '飞到路边标牌上，那里视野最好', scores: { '路边太近风险': 2, '像鹰一样出手': 1 }, feedbackImage: '/northern_hawk_owl_4_2.jpg', feedbackText: ['标牌上的视线绝佳。', '只是身下的喧嚣难以忽视。'] },
          { id: '4C', text: '沿着林子边慢慢换位置，不靠太近', scores: { '白天也看得很远': 1, '林子会收留': 1 }, feedbackImage: '/northern_hawk_owl_4_3.jpg', feedbackText: ['你像游魂般游走在林缘。', '始终保持着完美的距离。'] }
        ]
      },
      {
        id: 5,
        title: '雪地变蓝了',
        sceneText: ['傍晚来了。', '雪地一点点变蓝，树影拉长，风也冷下来。', '你今天已经等了很久。但你的眼睛还没有困。你选择：'],
        imageUrl: '/northern_hawk_owl_node5.jpg',
        choices: [
          { id: '5A', text: '回到林子深处，今晚站在安静的树上', scores: { '林子会收留': 2 }, feedbackImage: '/northern_hawk_owl_5_1.jpg', feedbackText: ['暮色温柔地拥抱了你。', '你融入了静谧的夜色之中。'] },
          { id: '5B', text: '留在最高的枝头，再看一会儿远处', scores: { '白天也看得很远': 2 }, feedbackImage: '/northern_hawk_owl_5_2.jpg', feedbackText: ['你迎接着寒冷的晚风。', '夜的序曲正在远方奏响。'] },
          { id: '5C', text: '飞到路边标牌上，最后确认一次雪地', scores: { '路边太近风险': 2 }, feedbackImage: '/northern_hawk_owl_5_3.jpg', feedbackText: ['你飞向了人工制高点。', '在最后的余晖中作别今日。'] }
        ]
      }
    ],
    endings: [
      {
        id: 'owl_1',
        name: '看得最远，也离路最近',
        type: 'Care Ending',
        text: [
          '路边的标牌真的很高。',
          '你站在那里，',
          '能看见更远的雪地。',
          '也能听见更近的车声。',
          '风从路面上刮过来，',
          '带着一点不属于林子的味道。',
          '你只是想看清楚一点。',
          '可有些地方，',
          '看得越远，',
          '离危险也越近。'
        ],
        achievement: '看得最远，也离路最近',
        careMessage: '路边的高处很好看，也可能是小鸟误以为安全的地方。'
      },
      {
        id: 'owl_2',
        name: '白天也有人醒着',
        type: 'True Ending',
        text: [
          '你站在白天里。',
          '太阳照着雪地，',
          '也照着你圆圆的眼睛。',
          '人类以为猫头鹰都属于夜晚。',
          '可你没有等天黑。',
          '你只是站得很高，',
          '醒得很早，',
          '把远处的动静先看清楚。',
          '有些清醒，',
          '不是因为夜深了。',
          '是因为你一直在看。'
        ],
        achievement: '不等天黑，也能看见自己的方向。'
      },
      {
        id: 'owl_3',
        name: '雪下面有一声很轻',
        type: 'True Ending',
        text: [
          '雪地看起来什么都没有。',
          '白，',
          '安静，',
          '像一张没有写字的纸。',
          '但你没有飞走。',
          '你等了一会儿，',
          '又等了一会儿。',
          '终于，雪下面轻轻动了一下。',
          '很小的一声，',
          '别人也许听不见，',
          '也看不见。',
          '但你知道，',
          '今天的答案已经出现了。'
        ],
        achievement: '安静不是没有回应，只是要多等一会儿。'
      },
      {
        id: 'owl_4',
        name: '那一秒你飞下去了',
        type: 'Normal Ending',
        text: [
          '你等了很久。',
          '风吹过树梢，',
          '雪地动了一下，',
          '世界突然露出一个很小的机会。',
          '然后你飞下去了。',
          '没有犹豫，',
          '没有多想。',
          '像一支从白天落下的箭。',
          '有些时刻不能一直观察。',
          '看准了，',
          '就要把身体交出去。'
        ],
        achievement: '等得很久，出手很轻。'
      },
      {
        id: 'owl_5',
        name: '回归深林',
        type: 'True Ending',
        text: [
          '你看过很远的雪地，',
          '也靠近过人类的路。',
          '傍晚的时候，',
          '你还是飞回了林子深处。',
          '树枝把你的影子接住。',
          '风声慢下来，',
          '雪也不再那么亮。',
          '你没有消失。',
          '你只是回到一个不需要解释自己的地方。',
          '有时候，',
          '离开不是害怕。',
          '是知道哪里会安静地收留你。'
        ],
        achievement: '看过很远，也知道回到哪里。'
      }
    ],
    evaluateEnding: (scores, history, endings) => {
      const risk = scores['路边太近风险'] || 0;
      
      if (risk >= 3 || (history.includes('4B') && history.includes('5C'))) {
        return endings.find(e => e.id === 'owl_1')!;
      }
      
      const tracks = ['白天也看得很远', '雪地有动静', '像鹰一样出手', '林子会收留'];
      const tops = getTopScoreKeyGroup(scores, tracks);
      
      if (tops.length > 1) {
        if (history.includes('3A') || history.includes('5B')) return endings.find(e => e.id === 'owl_2')!;
        if (history.includes('2A')) return endings.find(e => e.id === 'owl_3')!;
        if (history.includes('2B')) return endings.find(e => e.id === 'owl_4')!;
        return endings.find(e => e.id === 'owl_5')!;
      }
      
      const top = tops[0];
      if (top === '白天也看得很远') return endings.find(e => e.id === 'owl_2')!;
      if (top === '雪地有动静') return endings.find(e => e.id === 'owl_3')!;
      if (top === '像鹰一样出手') return endings.find(e => e.id === 'owl_4')!;
      return endings.find(e => e.id === 'owl_5')!;
    }
  }
];

const part3: any[] = [
  {
    id: 'ibis',
    name: '朱鹮',
    quote: '安静落在水边',
    description: '世界小心翼翼地看着你，但你真正想要的，也许只是安静地落在水边。',
    isPlayable: true,
    takeoffText: [
      '晨雾如纱，层层绕着村边的老松。',
      '你站在高高的树梢上，红色的脸庞在白羽间格外醒目。',
      '你展开一双朱粉色的宽阔羽翼，',
      '迎着微凉的清晨气流，滑向那片安静而澄明的水田。'
    ],
    nodes: [
      {
        id: 1,
        title: '晨雾还没散',
        sceneText: [
          '你醒在村边的一棵高树上。',
          '晨雾还没散，远处的水田亮了一小片。',
          '你决定：'
        ],
        imageUrl: '/crested_ibis_node1.jpg',
        choices: [
          {
            id: '1A',
            text: '飞去最近的浅水边，先找今天第一口饭',
            scores: { '一寸浅水': 1 },
            feedbackImage: '/crested_ibis_node1.jpg',
            feedbackText: [
              '浅水微凉，微波轻轻漾开去。',
              '你低头探去，寻觅着清晨的第一口温热。'
            ]
          },
          {
            id: '1B',
            text: '留在树上等一会儿，巢里还有小小的声音',
            scores: { '高树有巢': 1 },
            feedbackImage: '/crested_ibis_node1.jpg',
            feedbackText: [
              '树下晨风拂过你的白羽。',
              '你守在巢旁，耐心地听着微弱而稚嫩的呼唤。'
            ]
          },
          {
            id: '1C',
            text: '往更远的河湾飞，那里没人知道你醒了',
            scores: { '白羽归野': 1 },
            feedbackImage: '/crested_ibis_node1.jpg',
            feedbackText: [
              '你拍动翅膀，没入远处的苍翠。',
              '去无人知晓的旷野，自由游弋。'
            ]
          }
        ]
      },
      {
        id: 2,
        title: '长喙伸进泥里',
        sceneText: [
          '你落到水田边。',
          '泥很软，水很浅，刚好没过你的脚。',
          '你低头，把长喙伸进去。',
          '泥里轻轻动了一下。',
          '你决定：'
        ],
        imageUrl: '/crested_ibis_node2.jpg',
        choices: [
          {
            id: '2A',
            text: '沿着田埂慢慢走，一寸一寸找',
            scores: { '一寸浅水': 2 },
            feedbackImage: '/crested_ibis_node2.jpg',
            feedbackText: [
              '你一小步一小步沉稳挪动。',
              '在这段窄窄的水域，一寸寸丈量着生命的生息。'
            ]
          },
          {
            id: '2B',
            text: '去那块还留着水的稻田，那里虫声更细',
            scores: { '稻田留水': 2 },
            feedbackImage: '/crested_ibis_node2.jpg',
            feedbackText: [
              '你踩进清亮的水田中。',
              '那里的水汽温顺丰盈，微小的水蚤 and 昆虫声无比真切。'
            ]
          },
          {
            id: '2C',
            text: '飞到另一片浅水边，自己找自己的饭',
            scores: { '白羽归野': 1, '一寸浅水': 1 },
            feedbackImage: '/crested_ibis_node2.jpg',
            feedbackText: [
              '你飞向了另一侧幽静的岸边。',
              '不与谁争抢，安静无声地寻觅生趣。'
            ]
          }
        ]
      },
      {
        id: 3,
        title: '田里有水声',
        sceneText: [
          '不远处，有人类在田里弯着腰。',
          '他没有靠近你，只是把水慢慢放进田里。',
          '水声很小。',
          '但你听见了。',
          '你决定：'
        ],
        imageUrl: '/crested_ibis_node3.jpg',
        choices: [
          {
            id: '3A',
            text: '留在田埂边，等水一点点漫过泥',
            scores: { '稻田留水': 2 },
            feedbackImage: '/crested_ibis_node3.jpg',
            feedbackText: [
              '潺潺流动的水声温顺地漫过你的爪。',
              '泥土底下的生命重新活跃起来，带来一顿丰盛的中餐。'
            ]
          },
          {
            id: '3B',
            text: '飞回高树边，巢里也该安静一下了',
            scores: { '高树有巢': 2 },
            feedbackImage: '/crested_ibis_node3.jpg',
            feedbackText: [
              '你轻轻一跃，落回高挂在古松上的静室。',
              '将嘈杂和辛劳先抛在一旁。'
            ]
          },
          {
            id: '3C',
            text: '飞去河湾那边，风会把声音吹散',
            scores: { '白羽归野': 2 },
            feedbackImage: '/crested_ibis_node3.jpg',
            feedbackText: [
              '风带着旷野的味道。',
              '你在远离人类耕作的高处徐徐盘旋，舒畅极了。'
            ]
          }
        ]
      },
      {
        id: 4,
        title: '有人远远看你',
        sceneText: [
          '午后，你站在浅水里。',
          '栈道那边有人停下脚步，举起很长的镜头。',
          '一开始，他们站得很远。',
          '后来，有一个人又往前走了一点。',
          '你决定：'
        ],
        imageUrl: '/crested_ibis_node4.jpg',
        choices: [
          {
            id: '4A',
            text: '往芦苇后面走一点，隔着水就好',
            scores: { '白羽归野': 1, '太近的喜欢风险': 1 },
            feedbackImage: '/crested_ibis_node4.jpg',
            feedbackText: [
              '你优雅地侧开身体。',
              '退入修长挺拔的芦苇之后，让视界被翠绿和浅滩自然隔离开去。'
            ]
          },
          {
            id: '4B',
            text: '继续低头找食，今天的泥里还有动静',
            scores: { '一寸浅水': 2 },
            feedbackImage: '/crested_ibis_node4.jpg',
            feedbackText: [
              '你不紧不慢，长喙依旧灵巧探去。',
              '对你而言，填饱今天才是最重要的职责。'
            ]
          },
          {
            id: '4C',
            text: '飞回高树附近，那里更安静',
            scores: { '高树有巢': 2 },
            feedbackImage: '/crested_ibis_node4.jpg',
            feedbackText: [
              '拍动白色的大翼，你振翅冲上了蓝空。',
              '高大茂密的叶丛，才是真正让人定心的地方。'
            ]
          }
        ]
      },
      {
        id: 5,
        title: '傍晚的脚步声',
        sceneText: [
          '天慢慢暗下来。',
          '田里的水还在，风从稻叶上擦过去。',
          '栈道那边又有脚步声。',
          '有人压低声音，说不要再靠近了。',
          '你选择：'
        ],
        imageUrl: '/crested_ibis_node5.jpg',
        choices: [
          {
            id: '5A',
            text: '回到高树上，今晚先把巢守住',
            scores: { '高树有巢': 2 },
            feedbackImage: '/crested_ibis_node5.jpg',
            feedbackText: [
              '你飞回了温暖的旧巢。',
              '在夕阳的余晖中收拢双翼，静静呵护你的孩子。'
            ]
          },
          {
            id: '5B',
            text: '留在水田边，再找最后一口饭',
            scores: { '稻田留水': 1, '一寸浅水': 1 },
            feedbackImage: '/crested_ibis_node5.jpg',
            feedbackText: [
              '暮色昏暗，水影微朦。',
              '你低头默默从田泥中寻回了今天的最后一份收获。'
            ]
          },
          {
            id: '5C',
            text: '往更远的河湾飞，让风把人声吹散',
            scores: { '白羽归野': 1, '太近的喜欢风险': 1 },
            feedbackImage: '/crested_ibis_node5.jpg',
            feedbackText: [
              '白羽划破暮色。',
              '你飞向了那片空旷而自由的深湾，与安谧的风相伴。'
            ]
          }
        ]
      }
    ],
    endings: [
      {
        id: 'ibis_1',
        name: '太近的喜欢',
        type: 'Care Ending',
        text: [
          '你知道人类喜欢你。',
          '他们放轻声音，举起镜头，',
          '一开始只是远远看着。',
          '后来，有人又往前走了一点。',
          '你往芦苇后面退了一点。',
          '你不是不想被看见。',
          '只是想被看见以后，',
          '还能自己决定落在哪里。'
        ],
        achievement: 'Bad Ending：太近的喜欢',
        careMessage: '喜欢一只鸟，也许就是远远看见，然后不再往前。'
      },
      {
        id: 'ibis_2',
        name: '一寸浅水',
        type: 'True Ending',
        text: [
          '你在浅水里慢慢走。',
          '水刚没过脚，',
          '泥刚好软，',
          '长喙伸下去，',
          '就有一点轻轻的动静。',
          '人类总说保护很大。',
          '可对你来说，',
          '今天这寸水还在，',
          '就够认真活一天。'
        ],
        achievement: '世界很大，一小片水也很重要。'
      },
      {
        id: 'ibis_3',
        name: '田里还留着水',
        type: 'True Ending',
        text: [
          '傍晚，田里的水还没有被放干。',
          '人类在远处弯着腰，',
          '没有靠近你。',
          '你也没有飞走。',
          '你不知道什么叫共生。',
          '你只知道，',
          '这块田还留着水，',
          '你就还能找到一口饭。'
        ],
        achievement: '有人种田，也有人给你留饭。'
      },
      {
        id: 'ibis_4',
        name: '高树有巢',
        type: 'True Ending',
        text: [
          '天暗下来，',
          '你飞回村边那棵高树。',
          '巢里有一点小小的声音，',
          '听见你回来，',
          '就亮了一下。',
          '有些珍贵，',
          '不是被很多人看见。',
          '是天黑以后，',
          '还有地方等你落下。'
        ],
        achievement: '飞得再远，也记得把春天带回树上。'
      },
      {
        id: 'ibis_5',
        name: '白羽归野',
        type: 'True Ending',
        text: [
          '你飞向更远的河湾。',
          '那里没有人叫你的名字，',
          '也没有镜头追着你的白羽。',
          '只有风，浅水，',
          '和一块刚好能落脚的泥岸。',
          '人类说你很珍贵。',
          '你不太懂。',
          '你只知道，',
          '这一刻方向是自己选的。'
        ],
        achievement: '被珍惜过，也自己飞过。'
      }
    ],
    evaluateEnding: (scores, history, endings) => {
      const risk = scores['太近的喜欢风险'] || 0;
      if (risk >= 2 || (history.includes('4A') && history.includes('5C'))) {
        return endings.find(e => e.id === 'ibis_1')!;
      }
      
      const tracks = ['一寸浅水', '稻田留水', '高树有巢', '白羽归野'];
      const tops = getTopScoreKeyGroup(scores, tracks);
      
      if (tops.length === 1) {
        const top = tops[0];
        if (top === '一寸浅水') return endings.find(e => e.id === 'ibis_2')!;
        if (top === '稻田留水') return endings.find(e => e.id === 'ibis_3')!;
        if (top === '高树有巢') return endings.find(e => e.id === 'ibis_4')!;
        return endings.find(e => e.id === 'ibis_5')!;
      }
      
      if (tops.includes('一寸浅水')) return endings.find(e => e.id === 'ibis_2')!;
      if (tops.includes('稻田留水')) return endings.find(e => e.id === 'ibis_3')!;
      if (tops.includes('高树有巢')) return endings.find(e => e.id === 'ibis_4')!;
      return endings.find(e => e.id === 'ibis_5')!;
    }
  },
  {
    id: 'hoopoe',
    name: '戴胜',
    quote: '不解释的特别',
    description: '你从不解释自己，因为特别本来就不需要翻译。',
    isPlayable: true,
    takeoffText: [
      '日光落在一截灰冷的水泥墙根处。',
      '你试探着迈动了细碎而坚忍的步子。',
      '头顶那一柄精美万分的橘黛羽冠，',
      '随着急促的微风，一次次轻轻耸起，又合拢。'
    ],
    nodes: [
      {
        id: 1,
        title: '王冠还没收好',
        sceneText: [
          '你醒在墙根的土坎边。',
          '风一吹，头顶的冠羽自己打开了。',
          '看起来很隆重。其实你只是饿了。',
          '你决定：'
        ],
        imageUrl: '/Dyson_node1.jpg',
        choices: [
          {
            id: '1A',
            text: '先站一会儿，让风把冠羽吹顺',
            scores: { '冠羽开了一下': 1 },
            feedbackImage: '/Dyson_1_1.jpg',
            feedbackText: [
              '你静静伫立。风穿过绚烂的羽冠。',
              '哪怕有些冷，你也有你特别的傲骨。'
            ]
          },
          {
            id: '1B',
            text: '低头去土里探一探，看看早餐在哪',
            scores: { '土里有虫': 1 },
            feedbackImage: '/Dyson_1_2.jpg',
            feedbackText: [
              '长长的喙熟练地往湿泥中轻轻一扎。',
              '寻找晨光里第一份最实在的饱腹。'
            ]
          },
          {
            id: '1C',
            text: '沿着墙根走，找一条安静的旧缝',
            scores: { '暗窝守住了': 1 },
            feedbackImage: '/Dyson_1_3.jpg',
            feedbackText: [
              '你收拢羽毛，低浅行进。',
              '墙缝里的碎叶和气味，让你觉得格外安全。'
            ]
          }
        ]
      },
      {
        id: 2,
        title: '土下面有声音',
        sceneText: [
          '草地表面什么都没有。',
          '但你知道，饭常常在看不见的地方。',
          '你决定：'
        ],
        imageUrl: '/Dyson_node2.jpg',
        choices: [
          {
            id: '2A',
            text: '在原地慢慢探，等土里有动静',
            scores: { '土里有虫': 2 },
            feedbackImage: '/Dyson_2_1.jpg',
            feedbackText: [
              '你侧着头，耐心地在泥土边缘探听。',
              '泥下微小的虫行声音已在向你诉说。'
            ]
          },
          {
            id: '2B',
            text: '去落叶边，那里乱一点，土也软一点',
            scores: { '土里有虫': 1, '暗窝守住了': 1 },
            feedbackImage: '/Dyson_2_2.jpg',
            feedbackText: [
              '落叶底下堆积着腐植和润软。',
              '你轻快地扒开阻碍，啄到了一截甘甜的奖励。'
            ]
          },
          {
            id: '2C',
            text: '去新铺好的草皮边，那里平整又好看',
            scores: { '新草皮没虫风险': 2 },
            feedbackImage: '/Dyson_2_3.jpg',
            feedbackText: [
              '崭新光滑的草皮犹如一条工整的绿毯。',
              '只是这下面似乎死寂而空荡，嗅不到任何泥土生息的味道。'
            ]
          }
        ]
      },
      {
        id: 3,
        title: '猫看见你了',
        sceneText: [
          '你叼起一只虫。',
          '花坛后面，一只猫抬头看了过来。',
          '你决定：'
        ],
        imageUrl: '/Dyson_node3.jpg',
        choices: [
          {
            id: '3A',
            text: '忽高忽低地飞，让它看不准你',
            scores: { '怪路线回家': 2 },
            feedbackImage: '/Dyson_3_1.jpg',
            feedbackText: [
              '你起飞了，姿态像斑斓的蝴蝶在风中起伏跳跃。',
              '猫有些困惑地甩了甩头，已经对不上焦。'
            ]
          },
          {
            id: '3B',
            text: '落到矮桩上，等它先走开',
            scores: { '冠羽开了一下': 1, '怪路线回家': 1 },
            feedbackImage: '/Dyson_3_2.jpg',
            feedbackText: [
              '你稳稳落在了木桩的高处。',
              '高傲地张开冠羽，用气势与它礼貌而平视地僵持住。'
            ]
          },
          {
            id: '3C',
            text: '贴着地面快快掠过去，先把虫送回去',
            scores: { '暗窝守住了': 2 },
            feedbackImage: '/Dyson_3_3.jpg',
            feedbackText: [
              '你没有逗留，迅疾贴近死角飞返。',
              '闪入黑暗而温暖的墙缝，把食物塞入饥饿的睡梦。'
            ]
          }
        ]
      },
      {
        id: 4,
        title: '暗窝里有味道',
        sceneText: [
          '你回到土坎边。',
          '暗窝里有碎草、羽毛、小鸟的声音，还有你专属的味道。',
          '你决定：'
        ],
        imageUrl: '/Dyson_node4.jpg',
        choices: [
          {
            id: '4A',
            text: '继续守在附近，里面的声音还太小',
            scores: { '暗窝守住了': 2 },
            feedbackImage: '/Dyson_4_1.jpg',
            feedbackText: [
              '你在巢缝外警戒。',
              '不让任何可能的不速之客，窥听到里面稚嫩的清啼。'
            ]
          },
          {
            id: '4B',
            text: '抖开冠羽站在外面，像一块特别的门牌',
            scores: { '冠羽开了一下': 2 },
            feedbackImage: '/Dyson_4_2.jpg',
            feedbackText: [
              '你张开扇面的羽冠，五辉斑斓。',
              '用你无惧而醒目的美丽，宣示着这是不可冒犯的净土。'
            ]
          },
          {
            id: '4C',
            text: '飞到低枝上等一等，等风把附近的声音吹远',
            scores: { '怪路线回家': 1, '暗窝守住了': 1 },
            feedbackImage: '/Dyson_4_3.jpg',
            feedbackText: [
              '你隐在树枝上轻摇。',
              '风声渐渐平息了路过人兽的杂噪，你重新降落到洞口。'
            ]
          }
        ]
      },
      {
        id: 5,
        title: '花坛被整理过',
        sceneText: [
          '傍晚，你又回到花坛边。',
          '土被翻平了，落叶少了，虫声也少了。',
          '这里看起来更好看了。只是有点安静。',
          '你选择：'
        ],
        imageUrl: '/Dyson_node5.jpg',
        choices: [
          {
            id: '5A',
            text: '去远一点的乱草边，再探一会儿土',
            scores: { '土里有虫': 1 },
            feedbackImage: '/Dyson_5_1.jpg',
            feedbackText: [
              '你飞向远处未被人工染指的无名乱草。',
              '在那里，你再次抓到了最淳朴好吃的野食。'
            ]
          },
          {
            id: '5B',
            text: '回旧缝里，今天找到的已经够小鸟吃一口',
            scores: { '暗窝守住了': 2 },
            feedbackImage: '/Dyson_5_2.jpg',
            feedbackText: [
              '知足是最好的归宿。',
              '你衔着仅有的食物，安稳地隐回那漆黑如墨的暗裂。'
            ]
          },
          {
            id: '5C',
            text: '沿着整齐的新花坛走，也许只是虫藏深了',
            scores: { '新草皮没虫风险': 2 },
            feedbackImage: '/Dyson_5_3.jpg',
            feedbackText: [
              '新土被压实得密不通风。',
              '你无论用尽全力怎么扎入，都仿佛啄在冰冷的墙瓦上，空手而归。'
            ]
          }
        ]
      }
    ],
    endings: [
      {
        id: 'hoopoe_1',
        name: '土下无声',
        type: 'Care Ending',
        text: [
          '新草皮很漂亮。',
          '平整，干净，',
          '像一块绿色毯子。',
          '你把长喙伸进去。',
          '停了一会儿，',
          '什么也没有。',
          '人类说这里很好看。',
          '你也觉得好看。',
          '只是好看的地方，',
          '不一定有饭。'
        ],
        achievement: 'Bad Ending：土下无声',
        careMessage: '留一点松土、落叶和小虫，也是在给小鸟留饭。'
      },
      {
        id: 'hoopoe_2',
        name: '今天也叼回去了',
        type: 'True Ending',
        text: [
          '你回到土坎里的暗窝。',
          '那里不亮，',
          '也不漂亮。',
          '可你一靠近，',
          '里面的小嘴就亮起来。',
          '你把虫放下。',
          '它们安静了一点。',
          '你又转身出去。',
          '有些家不需要好看。',
          '它只要还在，',
          '春天就能继续长大。'
        ],
        achievement: '不显眼的地方，也认真养着明天。'
      },
      {
        id: 'hoopoe_3',
        name: '风也猜不到你',
        type: 'Normal Ending',
        text: [
          '你飞得不像一条直线。',
          '忽高忽低，',
          '像风临时改了主意。',
          '猫看了半天，',
          '最后放弃理解你。',
          '你绕过花坛，',
          '越过矮墙，',
          '把虫送回暗窝里。',
          '路怪一点，',
          '也能到家。'
        ],
        achievement: '不用飞得标准，也可以抵达。'
      },
      {
        id: 'hoopoe_4',
        name: '土里有一点动静',
        type: 'True Ending',
        text: [
          '草地上看起来什么都没有。',
          '你低着头，把长喙伸进土里，',
          '停一停，再换一个地方。',
          '有些鸟找食物靠眼睛。',
          '你不是。',
          '你等土轻轻动一下，',
          '等一只小虫，把自己从看不见的地方交出来。',
          '世界常常先看见你的冠羽。',
          '可你知道，',
          '真正能养活今天的，',
          '藏在低头以后。'
        ],
        achievement: '看起来很特别，也很认真地找饭。'
      },
      {
        id: 'hoopoe_5',
        name: '没说，但开屏了',
        type: 'Funny Ending',
        text: [
          '你没有准备表演。',
          '只是冠羽忽然打开了一下，',
          '草地就短暂地正式起来。',
          '麻雀看了你一眼。',
          '鸽子让开半步。',
          '但你什么也没说。',
          '你只是低头，',
          '从土里找出一只虫。',
          '特别不一定要解释。',
          '也可以只是这样过日子。'
        ],
        achievement: '怪得很有品，也活得很具体。'
      }
    ],
    evaluateEnding: (scores, history, endings) => {
      // 1. "新草皮没虫风险" Care Ending (Ending 1)
      const scoreRisk = scores['新草皮没虫风险'] || 0;
      if (scoreRisk >= 3 || (history.includes('2C') && history.includes('5C'))) {
        return endings.find(e => e.id === 'hoopoe_1')!;
      }
      
      const tracks = ['暗窝守住了', '怪路线回家', '土里有虫', '冠羽开了一下'];
      const tops = getTopScoreKeyGroup(scores, tracks);
      
      if (tops.length === 1) {
        const top = tops[0];
        if (top === '暗窝守住了') return endings.find(e => e.id === 'hoopoe_2')!;
        if (top === '怪路线回家') return endings.find(e => e.id === 'hoopoe_3')!;
        if (top === '土里有虫') return endings.find(e => e.id === 'hoopoe_4')!;
        return endings.find(e => e.id === 'hoopoe_5')!;
      }
      
      // Ties fallback or "未触发以上任何 Ending" goes to Ending 5
      return endings.find(e => e.id === 'hoopoe_5')!;
    }
  }
];

export const birdsConfig: BirdData[] = [...part1, ...part2, ...part3];
