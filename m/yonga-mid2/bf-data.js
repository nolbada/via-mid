/* 바꿔치기 감별 데이터 — 중2 동아(윤정미) 7과
   base: {id, src:'본문'|'대화', where, en, ko, v:[...]}
   같은 말: {en, same:true, ko, sw:[[원래 표현, 바뀐 표현, 한글 뜻], ...]}
   다른 말: {en, same:false, ko, diff:[원래 표현, 바뀐 표현, 원래 뜻, 바뀐 뜻], y:'쉬운 이유'} */
window.BF={7:[
/* ---------- 본문 ① 스페인 파야스 축제 ---------- */
{id:"r1",src:"본문",where:"본문 ① 파야스 축제",en:"People in Valencia celebrate the coming of spring with the Fallas festival.",ko:"발렌시아 사람들은 파야스 축제로 봄의 시작을 축하한다.",v:[
 {en:"The people of Valencia celebrate the start of spring with the Fallas festival.",same:true,ko:"발렌시아 사람들은 파야스 축제로 봄의 시작을 축하한다.",sw:[["People in Valencia","The people of Valencia","발렌시아 사람들"],["coming","start","(봄이) 옴, 시작"]]},
 {en:"With the Fallas festival, people in Valencia celebrate the arrival of spring.",same:true,ko:"파야스 축제로 발렌시아 사람들은 봄이 온 것을 축하한다.",sw:[["coming","arrival","(봄이) 옴, 도착"]]},
 {en:"People in Valencia celebrate the coming of summer with the Fallas festival.",same:false,ko:"발렌시아 사람들은 파야스 축제로 여름의 시작을 축하한다.",diff:["spring","summer","봄","여름"],y:"파야스 축제는 봄이 오는 걸 축하해요. 여름이 아니에요."},
 {en:"People in Valencia celebrate the end of spring with the Fallas festival.",same:false,ko:"발렌시아 사람들은 파야스 축제로 봄의 끝을 축하한다.",diff:["coming","end","옴, 시작","끝"],y:"봄이 오는 것(시작)을 축하하지, 봄이 끝나는 걸 축하하는 게 아니에요."}]},
{id:"r2",src:"본문",where:"본문 ① 파야스 축제",en:"This festival takes place from March 15 to 19.",ko:"이 축제는 3월 15일부터 19일까지 열린다.",v:[
 {en:"This festival is held from March 15 to 19.",same:true,ko:"이 축제는 3월 15일부터 19일까지 개최된다.",sw:[["takes place","is held","열린다, 개최된다"]]},
 {en:"This festival begins on March 15 and ends on March 19.",same:true,ko:"이 축제는 3월 15일에 시작해서 3월 19일에 끝난다.",sw:[["from","begins on","~부터 = ~에 시작한다"],["to 19","ends on March 19","19일까지 = 3월 19일에 끝난다"]]},
 {en:"This festival takes place from March 15 to 29.",same:false,ko:"이 축제는 3월 15일부터 29일까지 열린다.",diff:["19","29","19일","29일"],y:"축제는 19일에 끝나요. 29일이 아니에요."},
 {en:"This festival takes place from May 15 to 19.",same:false,ko:"이 축제는 5월 15일부터 19일까지 열린다.",diff:["March","May","3월","5월"],y:"축제는 3월(March)에 열려요. May는 5월이에요."}]},
{id:"r3",src:"본문",where:"본문 ① 파야스 축제",en:"During the festival, people enjoy parades and fireworks.",ko:"축제 기간 동안 사람들은 퍼레이드와 불꽃놀이를 즐긴다.",v:[
 {en:"During the festival, parades and fireworks are enjoyed by people.",same:true,ko:"축제 기간 동안 퍼레이드와 불꽃놀이가 사람들에 의해 즐겨진다.",sw:[["people enjoy","are enjoyed by people","사람들이 즐긴다 = 사람들에 의해 즐겨진다"]]},
 {en:"People have fun with parades and fireworks while the festival is going on.",same:true,ko:"축제가 열리는 동안 사람들은 퍼레이드와 불꽃놀이로 즐거운 시간을 보낸다.",sw:[["During the festival","while the festival is going on","축제 기간 동안"],["enjoy","have fun with","즐기다"]]},
 {en:"During the festival, people enjoy parades but not fireworks.",same:false,ko:"축제 기간 동안 사람들은 퍼레이드는 즐기지만 불꽃놀이는 즐기지 않는다.",diff:["and fireworks","but not fireworks","불꽃놀이도","불꽃놀이는 아니다"],y:"퍼레이드와 불꽃놀이 둘 다 즐겨요."},
 {en:"Before the festival, people enjoy parades and fireworks.",same:false,ko:"축제 전에 사람들은 퍼레이드와 불꽃놀이를 즐긴다.",diff:["During","Before","~동안","~전에"],y:"축제 '동안' 즐기는 거예요. 축제 '전'이 아니에요."}]},
{id:"r4",src:"본문",where:"본문 ① 파야스 축제",en:"The stars of the festival are fallas, giant wooden statues.",ko:"축제의 주인공은 거대한 나무 조각상인 파야들이다.",v:[
 {en:"Fallas, huge statues made of wood, are the stars of the festival.",same:true,ko:"나무로 만든 거대한 조각상인 파야들이 축제의 주인공이다.",sw:[["giant","huge","거대한"],["wooden","made of wood","나무로 된"]]},
 {en:"The main attractions of the festival are fallas, giant wooden statues.",same:true,ko:"축제에서 가장 눈길을 끄는 것은 거대한 나무 조각상인 파야들이다.",sw:[["stars","main attractions","주인공, 가장 눈길을 끄는 것"]]},
 {en:"The stars of the festival are fallas, small wooden statues.",same:false,ko:"축제의 주인공은 작은 나무 조각상인 파야들이다.",diff:["giant","small","거대한","작은"],y:"파야는 거대한 조각상이에요. 작지 않아요."},
 {en:"The stars of the festival are fallas, giant stone statues.",same:false,ko:"축제의 주인공은 거대한 돌 조각상인 파야들이다.",diff:["wooden","stone","나무로 된","돌로 된"],y:"파야는 나무로 만들어요. 돌이 아니에요. 그래서 태울 수 있어요."}]},
{id:"r5",src:"본문",where:"본문 ① 파야스 축제",en:"You can find hundreds of them all over the city.",ko:"도시 곳곳에서 수백 개의 파야들을 볼 수 있다.",v:[
 {en:"Hundreds of fallas can be found all over the city.",same:true,ko:"도시 곳곳에서 수백 개의 파야들이 발견될 수 있다.",sw:[["You can find","can be found","찾을 수 있다 = 발견될 수 있다"],["them","fallas","그것들 = 파야들"]]},
 {en:"There are hundreds of fallas everywhere in the city.",same:true,ko:"도시 모든 곳에 수백 개의 파야들이 있다.",sw:[["You can find","There are","볼 수 있다 = 있다"],["all over the city","everywhere in the city","도시 곳곳에"]]},
 {en:"You can find dozens of them all over the city.",same:false,ko:"도시 곳곳에서 수십 개의 파야들을 볼 수 있다.",diff:["hundreds","dozens","수백 개","수십 개"],y:"hundreds는 '수백', dozens는 '수십'이에요. 숫자가 달라요."},
 {en:"You can find hundreds of them only in the city center.",same:false,ko:"도시 중심가에서만 수백 개의 파야들을 볼 수 있다.",diff:["all over the city","only in the city center","도시 곳곳에","도시 중심가에서만"],y:"파야는 도시 곳곳에 있어요. 한 곳에만 있는 게 아니에요."}]},
{id:"r6",src:"본문",where:"본문 ① 파야스 축제",en:"Surprisingly, the fallas are burned on the last day of the festival.",ko:"놀랍게도, 축제의 마지막 날에는 이 파야들이 불태워진다.",v:[
 {en:"Surprisingly, people burn the fallas on the final day of the festival.",same:true,ko:"놀랍게도, 사람들은 축제의 마지막 날에 파야들을 불태운다.",sw:[["are burned","people burn","불태워진다 = 사람들이 불태운다"],["last","final","마지막"]]},
 {en:"Surprisingly, the fallas are set on fire on the festival’s last day.",same:true,ko:"놀랍게도, 축제의 마지막 날에 파야들에 불이 붙여진다.",sw:[["are burned","are set on fire","불태워진다"],["the last day of the festival","the festival’s last day","축제의 마지막 날"]]},
 {en:"Surprisingly, the fallas are burned on the first day of the festival.",same:false,ko:"놀랍게도, 축제의 첫날에 파야들이 불태워진다.",diff:["last","first","마지막","첫 번째"],y:"파야는 축제 마지막 날에 태워요. 첫날이 아니에요."},
 {en:"Surprisingly, the fallas are not burned on the last day of the festival.",same:false,ko:"놀랍게도, 축제의 마지막 날에 파야들은 불태워지지 않는다.",diff:["are burned","are not burned","불태워진다","불태워지지 않는다"],y:"not 한 단어가 뜻을 거꾸로 만들어요. 파야는 불태워져요."}]},
{id:"r7",src:"본문",where:"본문 ① 파야스 축제",en:"Burning them symbolizes saying goodbye to old things and hello to a new start.",ko:"그것들을 태우는 것은 오래된 것들과 작별하고 새로운 시작을 맞이하는 것을 상징한다.",v:[
 {en:"Burning the fallas means saying goodbye to old things and hello to a new start.",same:true,ko:"파야들을 태우는 것은 오래된 것들과 작별하고 새로운 시작을 맞이하는 것을 의미한다.",sw:[["them","the fallas","그것들 = 파야들"],["symbolizes","means","상징하다, 의미하다"]]},
 {en:"Burning them is a symbol of saying goodbye to old things and hello to a new start.",same:true,ko:"그것들을 태우는 것은 오래된 것들과 작별하고 새로운 시작을 맞이하는 것의 상징이다.",sw:[["symbolizes","is a symbol of","상징한다 = ~의 상징이다"]]},
 {en:"Building them symbolizes saying goodbye to old things and hello to a new start.",same:false,ko:"그것들을 만드는 것은 오래된 것들과 작별하고 새로운 시작을 맞이하는 것을 상징한다.",diff:["Burning","Building","태우는 것","만드는 것"],y:"상징하는 건 파야를 '태우는 것'이에요. 만드는 것이 아니에요."},
 {en:"Burning them symbolizes saying hello to old things and goodbye to a new start.",same:false,ko:"그것들을 태우는 것은 오래된 것들을 맞이하고 새로운 시작과 작별하는 것을 상징한다.",diff:["saying goodbye to old things","saying hello to old things","오래된 것과 작별","오래된 것을 맞이"],y:"오래된 것에는 '안녕(작별)', 새 시작에는 '안녕(환영)'이에요. 거꾸로 바뀌었어요."}]},
/* ---------- 본문 ② 스웨덴 한여름 축제 ---------- */
{id:"r8",src:"본문",where:"본문 ② 한여름 축제",en:"Winter in Sweden is long and dark, so the people there especially welcome summer.",ko:"스웨덴의 겨울은 길고 어두워서 그곳 사람들은 여름을 특히 환영한다.",v:[
 {en:"Because winter in Sweden is long and dark, the people there especially welcome summer.",same:true,ko:"스웨덴의 겨울은 길고 어둡기 때문에 그곳 사람들은 여름을 특히 환영한다.",sw:[["so","Because","그래서 = ~ 때문에"]]},
 {en:"Swedish people especially welcome summer because their winter is long and dark.",same:true,ko:"스웨덴 사람들은 그들의 겨울이 길고 어둡기 때문에 여름을 특히 환영한다.",sw:[["the people there","Swedish people","그곳(스웨덴) 사람들"],["so","because","그래서 = ~ 때문에"]]},
 {en:"Winter in Sweden is short and dark, so the people there especially welcome summer.",same:false,ko:"스웨덴의 겨울은 짧고 어두워서 그곳 사람들은 여름을 특히 환영한다.",diff:["long","short","긴","짧은"],y:"스웨덴의 겨울은 길어요. 짧지 않아요."},
 {en:"Winter in Sweden is long and dark, so the people there especially welcome spring.",same:false,ko:"스웨덴의 겨울은 길고 어두워서 그곳 사람들은 봄을 특히 환영한다.",diff:["summer","spring","여름","봄"],y:"스웨덴 사람들이 특히 반기는 건 여름이에요."}]},
{id:"r9",src:"본문",where:"본문 ② 한여름 축제",en:"To celebrate the longest day of the year, they have a special festival.",ko:"일 년 중 낮이 가장 긴 날을 기념하기 위해 그들은 특별한 축제를 연다.",v:[
 {en:"They hold a special festival to celebrate the longest day of the year.",same:true,ko:"그들은 일 년 중 낮이 가장 긴 날을 기념하기 위해 특별한 축제를 연다.",sw:[["have","hold","(축제를) 열다"]]},
 {en:"They have a special festival so that they can celebrate the longest day of the year.",same:true,ko:"그들은 일 년 중 낮이 가장 긴 날을 기념할 수 있도록 특별한 축제를 연다.",sw:[["To","so that they can","~하기 위해 = ~할 수 있도록"]]},
 {en:"To celebrate the shortest day of the year, they have a special festival.",same:false,ko:"일 년 중 낮이 가장 짧은 날을 기념하기 위해 그들은 특별한 축제를 연다.",diff:["longest","shortest","가장 긴","가장 짧은"],y:"한여름 축제는 낮이 가장 '긴' 날을 기념해요."},
 {en:"To celebrate the longest night of the year, they have a special festival.",same:false,ko:"일 년 중 밤이 가장 긴 날을 기념하기 위해 그들은 특별한 축제를 연다.",diff:["day","night","낮(날)","밤"],y:"가장 긴 건 '낮'이에요. 밤이 가장 긴 날은 한겨울이에요."}]},
{id:"r10",src:"본문",where:"본문 ② 한여름 축제",en:"They call it the Midsummer festival.",ko:"이 축제를 한여름 축제라고 부른다.",v:[
 {en:"The festival is called the Midsummer festival.",same:true,ko:"그 축제는 한여름 축제라고 불린다.",sw:[["They call it","The festival is called","그것을 ~라고 부른다 = 그 축제는 ~라고 불린다"]]},
 {en:"The name of the festival is the Midsummer festival.",same:true,ko:"그 축제의 이름은 한여름 축제이다.",sw:[["They call it","The name of the festival is","그것을 ~라고 부른다 = 그 축제의 이름은 ~이다"]]},
 {en:"They call it the Midwinter festival.",same:false,ko:"이 축제를 한겨울 축제라고 부른다.",diff:["Midsummer","Midwinter","한여름","한겨울"],y:"이름은 '한여름(Midsummer)' 축제예요."}]},
{id:"r11",src:"본문",where:"본문 ② 한여름 축제",en:"The festival starts on the Friday evening between June 19 and 25 and ends on the Sunday.",ko:"축제는 6월 19일과 25일 사이의 금요일 저녁에 시작하여 일요일에 끝난다.",v:[
 {en:"The festival begins on the Friday evening between June 19 and 25 and finishes on the Sunday.",same:true,ko:"축제는 6월 19일과 25일 사이의 금요일 저녁에 시작해서 일요일에 마친다.",sw:[["starts","begins","시작하다"],["ends","finishes","끝나다"]]},
 {en:"The festival ends on the Sunday after it starts on the Friday evening between June 19 and 25.",same:true,ko:"축제는 6월 19일과 25일 사이의 금요일 저녁에 시작한 후 일요일에 끝난다.",sw:[["and ends on the Sunday","ends on the Sunday after it starts","시작하고 일요일에 끝난다 = 시작한 뒤 일요일에 끝난다"]]},
 {en:"The festival starts on the Friday morning between June 19 and 25 and ends on the Sunday.",same:false,ko:"축제는 6월 19일과 25일 사이의 금요일 아침에 시작하여 일요일에 끝난다.",diff:["evening","morning","저녁","아침"],y:"축제는 금요일 '저녁'에 시작해요."},
 {en:"The festival starts on the Friday evening between June 19 and 25 and ends on the Saturday.",same:false,ko:"축제는 6월 19일과 25일 사이의 금요일 저녁에 시작하여 토요일에 끝난다.",diff:["Sunday","Saturday","일요일","토요일"],y:"축제는 일요일(Sunday)에 끝나요. Saturday는 토요일이에요."}]},
{id:"r12",src:"본문",where:"본문 ② 한여름 축제",en:"During the festival, people decorate a tall pole with flowers and green leaves and enjoy traditional dances around it.",ko:"축제 기간 동안 사람들은 꽃과 초록색 잎으로 큰 장대를 장식하고 그 주위를 돌며 전통 춤을 즐긴다.",v:[
 {en:"During the festival, a tall pole is decorated with flowers and green leaves, and people enjoy traditional dances around it.",same:true,ko:"축제 기간 동안 큰 장대가 꽃과 초록색 잎으로 장식되고, 사람들은 그 주위를 돌며 전통 춤을 즐긴다.",sw:[["people decorate a tall pole","a tall pole is decorated","사람들이 장대를 장식한다 = 장대가 장식된다"]]},
 {en:"During the festival, people decorate a tall pole with flowers and green leaves. They also enjoy traditional dances around the pole.",same:true,ko:"축제 기간 동안 사람들은 꽃과 초록색 잎으로 큰 장대를 장식한다. 그들은 또한 그 장대 주위를 돌며 전통 춤을 즐긴다.",sw:[["and enjoy","They also enjoy","그리고 즐긴다 = 그들은 또한 즐긴다"],["it","the pole","그것 = 그 장대"]]},
 {en:"During the festival, people decorate a short pole with flowers and green leaves and enjoy traditional dances around it.",same:false,ko:"축제 기간 동안 사람들은 꽃과 초록색 잎으로 짧은 장대를 장식하고 그 주위를 돌며 전통 춤을 즐긴다.",diff:["tall","short","키가 큰","짧은"],y:"장대는 키가 커요(tall). 짧지 않아요."},
 {en:"During the festival, people decorate a tall pole with flowers and green leaves and enjoy modern dances around it.",same:false,ko:"축제 기간 동안 사람들은 꽃과 초록색 잎으로 큰 장대를 장식하고 그 주위를 돌며 현대 춤을 즐긴다.",diff:["traditional","modern","전통의","현대의"],y:"장대 주위에서 추는 춤은 전통 춤이에요."}]},
{id:"r13",src:"본문",where:"본문 ② 한여름 축제",en:"Because the sun hardly sets at this time of year in Sweden, people can enjoy the festival all night long.",ko:"스웨덴에서 매년 이맘때면 해가 거의 지지 않기 때문에 사람들은 밤새도록 축제를 즐길 수 있다.",v:[
 {en:"The sun almost never sets at this time of year in Sweden, so people can enjoy the festival all night long.",same:true,ko:"스웨덴에서 매년 이맘때면 해가 거의 지지 않아서 사람들은 밤새도록 축제를 즐길 수 있다.",sw:[["hardly sets","almost never sets","거의 지지 않는다"],["Because","so","~ 때문에 = 그래서"]]},
 {en:"People can enjoy the festival through the whole night because the sun hardly sets at this time of year in Sweden.",same:true,ko:"스웨덴에서 매년 이맘때면 해가 거의 지지 않기 때문에 사람들은 밤 내내 축제를 즐길 수 있다.",sw:[["all night long","through the whole night","밤새도록, 밤 내내"]]},
 {en:"Because the sun sets early at this time of year in Sweden, people can enjoy the festival all night long.",same:false,ko:"스웨덴에서 매년 이맘때면 해가 일찍 지기 때문에 사람들은 밤새도록 축제를 즐길 수 있다.",diff:["hardly sets","sets early","거의 지지 않는다","일찍 진다"],y:"hardly는 '거의 ~않다'예요. 해가 일찍 지는 게 아니라 거의 안 져요."},
 {en:"Because the sun hardly sets at this time of year in Sweden, people can enjoy the festival only during the day.",same:false,ko:"스웨덴에서 매년 이맘때면 해가 거의 지지 않기 때문에 사람들은 낮에만 축제를 즐길 수 있다.",diff:["all night long","only during the day","밤새도록","낮에만"],y:"해가 거의 안 지니까 밤새도록 즐길 수 있어요. 낮에만이 아니에요."}]},
/* ---------- 본문 ③ 멕시코 망자의 날 ---------- */
{id:"r14",src:"본문",where:"본문 ③ 망자의 날",en:"Many Mexicans believe that once a year dead people come back home to meet their family and friends.",ko:"많은 멕시코 사람들은 일 년에 한 번 죽은 사람들이 가족과 친구들을 만나기 위해 집으로 돌아온다고 믿는다.",v:[
 {en:"Many Mexicans believe that dead people return home once a year to meet their family and friends.",same:true,ko:"많은 멕시코 사람들은 죽은 사람들이 가족과 친구들을 만나기 위해 일 년에 한 번 집으로 돌아온다고 믿는다.",sw:[["come back","return","돌아오다"]]},
 {en:"Many people in Mexico believe that once a year dead people come back home to see their family and friends.",same:true,ko:"멕시코의 많은 사람들은 일 년에 한 번 죽은 사람들이 가족과 친구들을 보기 위해 집으로 돌아온다고 믿는다.",sw:[["Mexicans","people in Mexico","멕시코 사람들"],["meet","see","만나다, 보다"]]},
 {en:"Many Mexicans believe that twice a year dead people come back home to meet their family and friends.",same:false,ko:"많은 멕시코 사람들은 일 년에 두 번 죽은 사람들이 가족과 친구들을 만나기 위해 집으로 돌아온다고 믿는다.",diff:["once","twice","한 번","두 번"],y:"죽은 사람들은 일 년에 '한 번' 돌아온다고 믿어요."},
 {en:"All Mexicans believe that once a year dead people come back home to meet their family and friends.",same:false,ko:"모든 멕시코 사람들은 일 년에 한 번 죽은 사람들이 가족과 친구들을 만나기 위해 집으로 돌아온다고 믿는다.",diff:["Many","All","많은","모든"],y:"'많은' 멕시코 사람들이 믿는 거예요. 모든 사람이라고 하지 않았어요."}]},
{id:"r15",src:"본문",where:"본문 ③ 망자의 날",en:"They call this day the Day of the Dead.",ko:"그들은 이날을 망자의 날이라고 부른다.",v:[
 {en:"This day is called the Day of the Dead.",same:true,ko:"이날은 망자의 날이라고 불린다.",sw:[["They call this day","This day is called","이날을 ~라고 부른다 = 이날은 ~라고 불린다"]]},
 {en:"The name of this day is the Day of the Dead.",same:true,ko:"이날의 이름은 망자의 날이다.",sw:[["They call this day","The name of this day is","이날을 ~라고 부른다 = 이날의 이름은 ~이다"]]},
 {en:"Mexicans call this day the Midsummer festival.",same:false,ko:"멕시코 사람들은 이날을 한여름 축제라고 부른다.",diff:["the Day of the Dead","the Midsummer festival","망자의 날","한여름 축제"],y:"한여름 축제는 스웨덴 축제예요. 멕시코의 이날은 '망자의 날'이에요."}]},
{id:"r16",src:"본문",where:"본문 ③ 망자의 날",en:"To welcome dead people, Mexicans hold a festival on November 1 and 2.",ko:"죽은 이들을 맞이하기 위해, 멕시코 사람들은 11월 1일과 2일에 축제를 연다.",v:[
 {en:"Mexicans have a festival on November 1 and 2 to welcome dead people.",same:true,ko:"멕시코 사람들은 죽은 이들을 맞이하기 위해 11월 1일과 2일에 축제를 연다.",sw:[["hold","have","(축제를) 열다"]]},
 {en:"A festival is held by Mexicans on November 1 and 2 in order to welcome dead people.",same:true,ko:"죽은 이들을 맞이하기 위해 11월 1일과 2일에 멕시코 사람들에 의해 축제가 열린다.",sw:[["Mexicans hold a festival","A festival is held by Mexicans","멕시코 사람들이 축제를 연다 = 축제가 멕시코 사람들에 의해 열린다"],["To","in order to","~하기 위해"]]},
 {en:"To welcome dead people, Mexicans hold a festival on October 1 and 2.",same:false,ko:"죽은 이들을 맞이하기 위해, 멕시코 사람들은 10월 1일과 2일에 축제를 연다.",diff:["November","October","11월","10월"],y:"망자의 날 축제는 11월(November)에 열려요. October는 10월이에요."},
 {en:"To scare away dead people, Mexicans hold a festival on November 1 and 2.",same:false,ko:"죽은 이들을 쫓아내기 위해, 멕시코 사람들은 11월 1일과 2일에 축제를 연다.",diff:["welcome","scare away","맞이하다","쫓아내다"],y:"죽은 이들을 반갑게 맞이하려고 축제를 열어요. 쫓아내려는 게 아니에요."}]},
{id:"r17",src:"본문",where:"본문 ③ 망자의 날",en:"They believe it is important to remember dead people.",ko:"그들은 고인을 기억하는 것이 중요하다고 믿는다.",v:[
 {en:"They think remembering dead people is important.",same:true,ko:"그들은 고인을 기억하는 것이 중요하다고 생각한다.",sw:[["believe","think","믿다, 생각하다"],["it is important to remember dead people","remembering dead people is important","고인을 기억하는 것이 중요하다"]]},
 {en:"They believe it is important not to forget dead people.",same:true,ko:"그들은 고인을 잊지 않는 것이 중요하다고 믿는다.",sw:[["to remember","not to forget","기억하다 = 잊지 않다"]]},
 {en:"They believe it is important to forget dead people.",same:false,ko:"그들은 고인을 잊는 것이 중요하다고 믿는다.",diff:["remember","forget","기억하다","잊다"],y:"고인을 '기억하는 것'이 중요하다고 믿어요. 잊는 게 아니에요."},
 {en:"They believe it is not important to remember dead people.",same:false,ko:"그들은 고인을 기억하는 것이 중요하지 않다고 믿는다.",diff:["is important","is not important","중요하다","중요하지 않다"],y:"not 한 단어로 뜻이 거꾸로 됐어요. 기억하는 건 중요해요."}]},
{id:"r18",src:"본문",where:"본문 ③ 망자의 날",en:"So, people set up altars in their homes and have big parties in cemeteries.",ko:"그래서 사람들은 집에 제단을 차리고, 묘지에서 큰 파티를 연다.",v:[
 {en:"So, people make altars in their houses and have big parties in cemeteries.",same:true,ko:"그래서 사람들은 집에 제단을 만들고, 묘지에서 큰 파티를 연다.",sw:[["set up","make","차리다, 만들다"],["homes","houses","집"]]},
 {en:"So, big parties are held in cemeteries, and altars are set up in people’s homes.",same:true,ko:"그래서 묘지에서 큰 파티가 열리고, 사람들의 집에는 제단이 차려진다.",sw:[["have big parties","big parties are held","큰 파티를 연다 = 큰 파티가 열린다"],["set up altars in their homes","altars are set up in people’s homes","집에 제단을 차린다 = 집에 제단이 차려진다"]]},
 {en:"So, people set up altars in cemeteries and have big parties in their homes.",same:false,ko:"그래서 사람들은 묘지에 제단을 차리고, 집에서 큰 파티를 연다.",diff:["altars in their homes","altars in cemeteries","집에 제단","묘지에 제단"],y:"제단은 '집'에, 파티는 '묘지'에서 해요. 장소가 서로 바뀌었어요."},
 {en:"So, people set up altars in their homes and have small parties in cemeteries.",same:false,ko:"그래서 사람들은 집에 제단을 차리고, 묘지에서 작은 파티를 연다.",diff:["big","small","큰","작은"],y:"묘지에서 여는 파티는 큰 파티예요."}]},
{id:"r19",src:"본문",where:"본문 ③ 망자의 날",en:"In some areas, people dress up like skeletons and hold big parades.",ko:"일부 지역에서는 사람들이 해골처럼 분장하고 대규모 퍼레이드를 벌인다.",v:[
 {en:"In some places, people dress up as skeletons and have big parades.",same:true,ko:"일부 지역에서는 사람들이 해골로 분장하고 대규모 퍼레이드를 한다.",sw:[["areas","places","지역, 곳"],["like","as","~처럼, ~로"],["hold","have","(퍼레이드를) 벌이다"]]},
 {en:"In some areas, big parades are held by people who dress up like skeletons.",same:true,ko:"일부 지역에서는 해골처럼 분장한 사람들에 의해 대규모 퍼레이드가 열린다.",sw:[["hold big parades","big parades are held by people","퍼레이드를 벌인다 = 퍼레이드가 사람들에 의해 열린다"]]},
 {en:"In all areas, people dress up like skeletons and hold big parades.",same:false,ko:"모든 지역에서 사람들이 해골처럼 분장하고 대규모 퍼레이드를 벌인다.",diff:["some","all","일부","모든"],y:"'일부' 지역에서만 해요. 모든 지역이 아니에요."},
 {en:"In some areas, people dress up like ghosts and hold big parades.",same:false,ko:"일부 지역에서는 사람들이 유령처럼 분장하고 대규모 퍼레이드를 벌인다.",diff:["skeletons","ghosts","해골","유령"],y:"사람들은 해골(skeleton)처럼 분장해요. 유령이 아니에요."}]},
/* ---------- 본문 ④ 알래스카 퍼 론디 축제 ---------- */
{id:"r20",src:"본문",where:"본문 ④ 퍼 론디 축제",en:"At the end of February, people in Alaska hold the Fur Rondy festival, one of the biggest winter festivals in the world.",ko:"2월 말, 알래스카 사람들은 세계에서 가장 큰 겨울 축제 중 하나인 퍼 론디 축제를 연다.",v:[
 {en:"The Fur Rondy festival, one of the largest winter festivals in the world, is held in Alaska in late February.",same:true,ko:"세계에서 가장 큰 겨울 축제 중 하나인 퍼 론디 축제는 2월 말에 알래스카에서 열린다.",sw:[["At the end of February","in late February","2월 말에"],["hold","is held","연다 = 열린다"],["biggest","largest","가장 큰"]]},
 {en:"At the end of February, Alaskans hold the Fur Rondy festival, which is one of the world’s biggest winter festivals.",same:true,ko:"2월 말, 알래스카 사람들은 세계에서 가장 큰 겨울 축제 중 하나인 퍼 론디 축제를 연다.",sw:[["people in Alaska","Alaskans","알래스카 사람들"],["in the world","the world’s","세계에서, 세계의"]]},
 {en:"At the beginning of February, people in Alaska hold the Fur Rondy festival, one of the biggest winter festivals in the world.",same:false,ko:"2월 초, 알래스카 사람들은 세계에서 가장 큰 겨울 축제 중 하나인 퍼 론디 축제를 연다.",diff:["end","beginning","말(끝)","초(시작)"],y:"퍼 론디 축제는 2월 '말'에 열려요. 2월 초가 아니에요."},
 {en:"At the end of February, people in Alaska hold the Fur Rondy festival, the biggest winter festival in the world.",same:false,ko:"2월 말, 알래스카 사람들은 세계에서 가장 큰 겨울 축제인 퍼 론디 축제를 연다.",diff:["one of the biggest winter festivals","the biggest winter festival","가장 큰 축제 중 하나","가장 큰 축제(1등)"],y:"'가장 큰 축제 중 하나'예요. 세계 1등으로 큰 축제라고 하지 않았어요."}]},
{id:"r21",src:"본문",where:"본문 ④ 퍼 론디 축제",en:"During this festival, visitors can enjoy various winter sports and Alaskan traditional games.",ko:"이 축제 기간 동안 방문객들은 다양한 겨울 스포츠와 알래스카 전통 게임을 즐길 수 있다.",v:[
 {en:"During this festival, visitors can enjoy many different winter sports and traditional games of Alaska.",same:true,ko:"이 축제 기간 동안 방문객들은 여러 가지 겨울 스포츠와 알래스카의 전통 게임을 즐길 수 있다.",sw:[["various","many different","다양한, 여러 가지"],["Alaskan traditional games","traditional games of Alaska","알래스카 전통 게임"]]},
 {en:"Various winter sports and Alaskan traditional games can be enjoyed by visitors during this festival.",same:true,ko:"이 축제 기간 동안 다양한 겨울 스포츠와 알래스카 전통 게임이 방문객들에 의해 즐겨질 수 있다.",sw:[["visitors can enjoy","can be enjoyed by visitors","방문객들이 즐길 수 있다 = 방문객들에 의해 즐겨질 수 있다"]]},
 {en:"During this festival, visitors can enjoy various summer sports and Alaskan traditional games.",same:false,ko:"이 축제 기간 동안 방문객들은 다양한 여름 스포츠와 알래스카 전통 게임을 즐길 수 있다.",diff:["winter","summer","겨울","여름"],y:"퍼 론디는 겨울 축제라서 겨울 스포츠를 즐겨요."},
 {en:"During this festival, visitors can enjoy various winter sports and Korean traditional games.",same:false,ko:"이 축제 기간 동안 방문객들은 다양한 겨울 스포츠와 한국 전통 게임을 즐길 수 있다.",diff:["Alaskan","Korean","알래스카의","한국의"],y:"즐기는 건 '알래스카' 전통 게임이에요."}]},
{id:"r22",src:"본문",where:"본문 ④ 퍼 론디 축제",en:"They can also enjoy many special events such as the Running of the Reindeer.",ko:"그들은 또한 순록 경주 같은 많은 특별한 행사도 즐길 수 있다.",v:[
 {en:"They can also enjoy many special events like the Running of the Reindeer.",same:true,ko:"그들은 또한 순록 경주 같은 많은 특별한 행사도 즐길 수 있다.",sw:[["such as","like","~와 같은"]]},
 {en:"The Running of the Reindeer is one of the many special events they can also enjoy.",same:true,ko:"순록 경주는 그들이 또한 즐길 수 있는 많은 특별한 행사 중 하나이다.",sw:[["such as","is one of","~와 같은 = ~ 중 하나이다"]]},
 {en:"They can also enjoy many special events such as the Running of the Horses.",same:false,ko:"그들은 또한 말 경주 같은 많은 특별한 행사도 즐길 수 있다.",diff:["Reindeer","Horses","순록","말"],y:"특별한 행사는 '순록(reindeer)' 경주예요. 말이 아니에요."},
 {en:"They can also enjoy only one special event, the Running of the Reindeer.",same:false,ko:"그들은 또한 단 하나의 특별한 행사인 순록 경주를 즐길 수 있다.",diff:["many special events","only one special event","많은 특별한 행사","단 하나의 특별한 행사"],y:"특별한 행사는 '많아요'. 순록 경주는 그중 하나의 예일 뿐이에요."}]},
{id:"r23",src:"본문",where:"본문 ④ 퍼 론디 축제",en:"People who participate in this race wear fun costumes and try to run faster than reindeer.",ko:"이 경주에 참가하는 사람들은 재미있는 복장을 입고 순록보다 더 빨리 달리려고 애쓴다.",v:[
 {en:"People who take part in this race wear fun costumes and try to run faster than reindeer.",same:true,ko:"이 경주에 참가하는 사람들은 재미있는 복장을 입고 순록보다 더 빨리 달리려고 애쓴다.",sw:[["participate in","take part in","~에 참가하다"]]},
 {en:"In this race, people wear fun costumes and try to run faster than reindeer.",same:true,ko:"이 경주에서 사람들은 재미있는 복장을 입고 순록보다 더 빨리 달리려고 애쓴다.",sw:[["People who participate in this race","In this race, people","이 경주에 참가하는 사람들 = 이 경주에서 사람들은"]]},
 {en:"People who participate in this race wear fun costumes and try to run slower than reindeer.",same:false,ko:"이 경주에 참가하는 사람들은 재미있는 복장을 입고 순록보다 더 느리게 달리려고 애쓴다.",diff:["faster","slower","더 빨리","더 느리게"],y:"순록보다 '더 빨리' 달리려고 해요."},
 {en:"People who watch this race wear fun costumes and try to run faster than reindeer.",same:false,ko:"이 경주를 구경하는 사람들은 재미있는 복장을 입고 순록보다 더 빨리 달리려고 애쓴다.",diff:["participate in","watch","~에 참가하다","~을 구경하다"],y:"재미있는 복장을 입고 달리는 사람은 경주에 '참가하는' 사람이에요."}]},
{id:"r24",src:"본문",where:"본문 ④ 퍼 론디 축제",en:"Is it possible to do so? Not really, but it doesn’t matter.",ko:"과연 그럴 수 있을까? 그럴 거 같지는 않지만, 그것은 중요하지 않다.",v:[
 {en:"It is not really possible to run faster than reindeer, but that is not important.",same:true,ko:"순록보다 더 빨리 달리는 것은 사실 가능하지 않지만, 그것은 중요하지 않다.",sw:[["do so","run faster than reindeer","그렇게 하다 = 순록보다 빨리 달리다"],["doesn’t matter","is not important","중요하지 않다"]]},
 {en:"People can hardly run faster than reindeer, but it doesn’t matter.",same:true,ko:"사람들이 순록보다 더 빨리 달리기는 거의 불가능하지만, 그것은 중요하지 않다.",sw:[["Is it possible to do so? Not really","People can hardly run faster than reindeer","그럴 수 있을까? 그렇지 않다 = 사람들은 순록보다 빨리 거의 못 달린다"]]},
 {en:"It is possible to run faster than reindeer, but it doesn’t matter.",same:false,ko:"순록보다 더 빨리 달리는 것은 가능하지만, 그것은 중요하지 않다.",diff:["Not really","It is possible","그렇지 않다(거의 불가능)","가능하다"],y:"Not really는 '그렇지는 않다'는 뜻이에요. 순록보다 빨리 달리기는 거의 불가능해요."},
 {en:"It is not really possible to run faster than reindeer, and it matters a lot.",same:false,ko:"순록보다 더 빨리 달리는 것은 사실 가능하지 않고, 그것은 아주 중요하다.",diff:["doesn’t matter","matters a lot","중요하지 않다","아주 중요하다"],y:"이기는 건 '중요하지 않다'고 했어요. 모두 그냥 즐기니까요."}]},
{id:"r25",src:"본문",where:"본문 ④ 퍼 론디 축제",en:"Everyone is just having fun!",ko:"모두가 그저 즐기고 있을 뿐이다!",v:[
 {en:"All the people are just enjoying themselves!",same:true,ko:"모든 사람들이 그저 즐기고 있을 뿐이다!",sw:[["Everyone","All the people","모두, 모든 사람들"],["having fun","enjoying themselves","즐기다, 즐거운 시간을 보내다"]]},
 {en:"Everybody is simply having a good time!",same:true,ko:"모두가 그저 즐거운 시간을 보내고 있을 뿐이다!",sw:[["Everyone","Everybody","모두"],["just","simply","그저"],["having fun","having a good time","즐기다, 좋은 시간을 보내다"]]},
 {en:"Only the winners are having fun!",same:false,ko:"이긴 사람들만 즐기고 있다!",diff:["Everyone","Only the winners","모두","이긴 사람들만"],y:"'모두'가 즐겨요. 이긴 사람만 즐기는 게 아니에요."},
 {en:"Everyone is just getting tired!",same:false,ko:"모두가 그저 지쳐 가고 있을 뿐이다!",diff:["having fun","getting tired","즐기다","지치다"],y:"모두 '즐기고' 있어요. 지친다는 말은 없어요."}]},
/* ---------- 대화 ---------- */
{id:"d1",src:"대화",where:"Watch and Check 1",en:"Leo: We can do face painting or play VR games. Which do you like more?\nMia: I like face painting more.",ko:"Leo: 우리는 페이스 페인팅을 하거나 VR 게임을 할 수 있어. 너는 어느 것이 더 좋니?\nMia: 나는 페이스 페인팅이 더 좋아.",v:[
 {en:"Mia prefers face painting to VR games.",same:true,ko:"Mia는 VR 게임보다 페이스 페인팅을 더 좋아한다.",sw:[["like face painting more","prefers face painting to VR games","페이스 페인팅이 더 좋다"]]},
 {en:"Mia likes face painting better than playing VR games.",same:true,ko:"Mia는 VR 게임을 하는 것보다 페이스 페인팅을 더 좋아한다.",sw:[["more","better than playing VR games","더 (좋다)"]]},
 {en:"Mia likes VR games more than face painting.",same:false,ko:"Mia는 페이스 페인팅보다 VR 게임을 더 좋아한다.",diff:["like face painting more","likes VR games more","페이스 페인팅이 더 좋다","VR 게임이 더 좋다"],y:"Mia가 더 좋아하는 건 페이스 페인팅이에요."},
 {en:"Leo likes face painting more.",same:false,ko:"Leo는 페이스 페인팅을 더 좋아한다.",diff:["Mia","Leo","Mia","Leo"],y:"페이스 페인팅이 더 좋다고 말한 사람은 Mia예요. 사람이 바뀌었어요."}]},
{id:"d2",src:"대화",where:"Watch and Check 1",en:"Leo: I want to play VR games. I don’t want to wash my face again.",ko:"Leo: 나는 VR 게임을 하고 싶어. 세수를 다시 하고 싶지 않거든.",v:[
 {en:"Leo wants to play VR games because he doesn’t want to wash his face again.",same:true,ko:"Leo는 세수를 다시 하고 싶지 않아서 VR 게임을 하고 싶어 한다.",sw:[["I want","Leo wants","나는 원한다 = Leo는 원한다"],["my face","his face","내 얼굴 = 그의 얼굴"]]},
 {en:"Leo doesn’t want to wash his face one more time.",same:true,ko:"Leo는 한 번 더 세수하고 싶지 않다.",sw:[["again","one more time","다시, 한 번 더"]]},
 {en:"Leo wants to wash his face again.",same:false,ko:"Leo는 다시 세수하고 싶어 한다.",diff:["don’t want","wants","원하지 않는다","원한다"],y:"Leo는 세수를 다시 하기 '싫어서' VR 게임을 고른 거예요."},
 {en:"Leo doesn’t want to wash his hands again.",same:false,ko:"Leo는 다시 손을 씻고 싶지 않다.",diff:["face","hands","얼굴","손"],y:"Leo가 다시 씻기 싫은 건 얼굴(face)이에요. 페이스 페인팅을 하면 세수해야 하니까요."}]},
{id:"d3",src:"대화",where:"Watch and Check 1",en:"Mia: Playing VR games is OK, too. Let’s go play VR games together.",ko:"Mia: VR 게임을 하는 것도 괜찮아. 같이 VR 게임하러 가자.",v:[
 {en:"Mia says it is also fine to play VR games, and she suggests playing them together.",same:true,ko:"Mia는 VR 게임을 하는 것도 괜찮다고 말하고, 같이 하자고 제안한다.",sw:[["is OK, too","is also fine","~도 괜찮다"],["Let’s go play","suggests playing","~하러 가자 = ~하자고 제안한다"]]},
 {en:"Mia agrees to play VR games with Leo.",same:true,ko:"Mia는 Leo와 함께 VR 게임을 하는 것에 동의한다.",sw:[["Let’s go play VR games together","agrees to play VR games with Leo","같이 VR 게임 하러 가자 = Leo와 VR 게임 하기로 한다"]]},
 {en:"Mia says playing VR games is boring.",same:false,ko:"Mia는 VR 게임을 하는 것이 지루하다고 말한다.",diff:["OK","boring","괜찮은","지루한"],y:"Mia는 VR 게임도 '괜찮다'고 했어요."},
 {en:"Mia wants to play VR games alone.",same:false,ko:"Mia는 VR 게임을 혼자 하고 싶어 한다.",diff:["together","alone","함께","혼자"],y:"Mia는 '같이' 하러 가자고 했어요."}]},
{id:"d4",src:"대화",where:"Watch and Check 2",en:"Junsu: They have tteokbokki and gimbap here. Which of the two do you like better?\nYena: I like tteokbokki much better. I like spicy food.",ko:"준수: 여기 떡볶이와 김밥이 있어. 둘 중에서 어느 것이 더 좋니?\n예나: 나는 떡볶이가 훨씬 더 좋아. 매운 음식을 좋아하거든.",v:[
 {en:"Yena prefers tteokbokki to gimbap because she likes spicy food.",same:true,ko:"예나는 매운 음식을 좋아해서 김밥보다 떡볶이를 더 좋아한다.",sw:[["like tteokbokki much better","prefers tteokbokki to gimbap","떡볶이가 (김밥보다) 더 좋다"]]},
 {en:"Yena likes spicy food, so she likes tteokbokki a lot more than gimbap.",same:true,ko:"예나는 매운 음식을 좋아해서 김밥보다 떡볶이를 훨씬 더 좋아한다.",sw:[["much better","a lot more than gimbap","훨씬 더"]]},
 {en:"Yena likes gimbap much better.",same:false,ko:"예나는 김밥을 훨씬 더 좋아한다.",diff:["I like tteokbokki much better","likes gimbap much better","떡볶이가 훨씬 더 좋다","김밥이 훨씬 더 좋다"],y:"예나가 더 좋아하는 건 떡볶이예요."},
 {en:"Yena doesn’t like spicy food.",same:false,ko:"예나는 매운 음식을 좋아하지 않는다.",diff:["I like spicy food","doesn’t like spicy food","매운 음식을 좋아한다","매운 음식을 좋아하지 않는다"],y:"예나는 매운 음식을 '좋아해서' 떡볶이를 골랐어요."}]},
{id:"d5",src:"대화",where:"Watch and Check 2",en:"Junsu: Then, let’s order tteokbokki. It looks delicious.\nYena: OK. I’m so hungry!",ko:"준수: 그럼 떡볶이를 주문하자. 맛있어 보이네.\n예나: 좋아. 너무 배고파!",v:[
 {en:"Junsu and Yena decide to order tteokbokki.",same:true,ko:"준수와 예나는 떡볶이를 주문하기로 한다.",sw:[["let’s order","decide to order","주문하자 = 주문하기로 한다"]]},
 {en:"Junsu thinks the tteokbokki looks tasty.",same:true,ko:"준수는 떡볶이가 맛있어 보인다고 생각한다.",sw:[["delicious","tasty","맛있는"]]},
 {en:"Junsu says the tteokbokki looks expensive.",same:false,ko:"준수는 떡볶이가 비싸 보인다고 말한다.",diff:["delicious","expensive","맛있는","비싼"],y:"준수는 떡볶이가 '맛있어' 보인다고 했어요."},
 {en:"Yena says she is very thirsty.",same:false,ko:"예나는 자기가 매우 목마르다고 말한다.",diff:["hungry","thirsty","배고픈","목마른"],y:"예나는 '배고프다(hungry)'고 했어요. thirsty는 목마르다예요."}]},
{id:"d6",src:"대화",where:"Watch and Check 3",en:"Kate: Let’s get a souvenir.\nLiam: Which do you like better, the T-shirt or the cap?\nKate: I like the T-shirt better.",ko:"Kate: 기념품을 사자.\nLiam: 티셔츠와 모자 중에서 어느 것이 더 좋니?\nKate: 나는 티셔츠가 더 좋아.",v:[
 {en:"Kate prefers the T-shirt to the cap.",same:true,ko:"Kate는 모자보다 티셔츠를 더 좋아한다.",sw:[["I like the T-shirt better","prefers the T-shirt to the cap","티셔츠가 (모자보다) 더 좋다"]]},
 {en:"Kate likes the cap less than the T-shirt.",same:true,ko:"Kate는 티셔츠보다 모자를 덜 좋아한다.",sw:[["I like the T-shirt better","likes the cap less than the T-shirt","티셔츠가 더 좋다 = 모자를 덜 좋아한다"]]},
 {en:"Kate prefers the cap to the T-shirt.",same:false,ko:"Kate는 티셔츠보다 모자를 더 좋아한다.",diff:["I like the T-shirt better","prefers the cap to the T-shirt","티셔츠가 더 좋다","모자가 더 좋다"],y:"Kate가 더 좋아하는 건 티셔츠예요. 순서만 바꿔도 뜻이 거꾸로 돼요."},
 {en:"Kate and Liam want to buy some food.",same:false,ko:"Kate와 Liam은 음식을 사고 싶어 한다.",diff:["a souvenir","some food","기념품","음식"],y:"두 사람이 사려는 건 기념품(souvenir)이에요."}]},
{id:"d7",src:"대화",where:"Watch and Check 3",en:"Liam: Why?\nKate: There is a nice picture of the festival on it.",ko:"Liam: 왜?\nKate: 거기(티셔츠)에 멋진 축제 그림이 있거든.",v:[
 {en:"Kate likes the T-shirt because it has a nice picture of the festival.",same:true,ko:"Kate는 티셔츠에 멋진 축제 그림이 있어서 티셔츠를 좋아한다.",sw:[["There is","it has","~이 있다 = 그것은 ~을 가지고 있다"]]},
 {en:"A nice picture of the festival is on the T-shirt.",same:true,ko:"멋진 축제 그림이 그 티셔츠에 있다.",sw:[["it","the T-shirt","그것 = 그 티셔츠"]]},
 {en:"There is a nice picture of the festival on the cap.",same:false,ko:"그 모자에 멋진 축제 그림이 있다.",diff:["it","the cap","그것(티셔츠)","그 모자"],y:"it은 Kate가 고른 티셔츠예요. 모자가 아니에요."},
 {en:"There is a nice picture of a flower on it.",same:false,ko:"거기에 멋진 꽃 그림이 있다.",diff:["the festival","a flower","축제","꽃"],y:"티셔츠에 있는 건 '축제' 그림이에요."}]},
{id:"d8",src:"대화",where:"Watch and Check 4",en:"Ethan: Which do you like more, the red flowers or the yellow flowers?\nSophia: I like the yellow flowers more.",ko:"Ethan: 빨간 꽃과 노란 꽃 중에서 어느 것이 더 좋니?\nSophia: 나는 노란 꽃이 더 좋아.",v:[
 {en:"Sophia likes the yellow flowers better than the red ones.",same:true,ko:"Sophia는 빨간 꽃보다 노란 꽃을 더 좋아한다.",sw:[["more","better than the red ones","더 (좋다) = 빨간 것들보다 더"]]},
 {en:"Sophia prefers the yellow flowers to the red flowers.",same:true,ko:"Sophia는 빨간 꽃보다 노란 꽃을 더 좋아한다.",sw:[["I like the yellow flowers more","prefers the yellow flowers to the red flowers","노란 꽃이 더 좋다"]]},
 {en:"Sophia likes the red flowers more.",same:false,ko:"Sophia는 빨간 꽃을 더 좋아한다.",diff:["I like the yellow flowers more","likes the red flowers more","노란 꽃이 더 좋다","빨간 꽃이 더 좋다"],y:"Sophia가 더 좋아하는 건 노란 꽃이에요."},
 {en:"Ethan likes the yellow flowers more.",same:false,ko:"Ethan은 노란 꽃을 더 좋아한다.",diff:["Sophia","Ethan","Sophia","Ethan"],y:"노란 꽃이 더 좋다고 말한 사람은 Sophia예요. Ethan은 물어본 사람이에요."}]},
{id:"d9",src:"대화",where:"Watch and Check 4",en:"Ethan: Why do you like them more?\nSophia: Well, yellow is my favorite color.",ko:"Ethan: 왜 그것들(노란 꽃)이 더 좋니?\nSophia: 음, 노란색이 내가 가장 좋아하는 색이거든.",v:[
 {en:"Sophia’s favorite color is yellow.",same:true,ko:"Sophia가 가장 좋아하는 색은 노란색이다.",sw:[["yellow is my favorite color","Sophia’s favorite color is yellow","노란색이 내가 가장 좋아하는 색 = Sophia가 가장 좋아하는 색은 노란색"]]},
 {en:"Sophia likes yellow more than any other color.",same:true,ko:"Sophia는 다른 어떤 색보다 노란색을 더 좋아한다.",sw:[["my favorite color","more than any other color","가장 좋아하는 색 = 다른 어떤 색보다 더 좋아하는"]]},
 {en:"Sophia’s favorite color is red.",same:false,ko:"Sophia가 가장 좋아하는 색은 빨간색이다.",diff:["yellow","red","노란색","빨간색"],y:"Sophia가 가장 좋아하는 색은 노란색이에요."},
 {en:"Sophia likes the yellow flowers because of their smell.",same:false,ko:"Sophia는 노란 꽃의 향기 때문에 노란 꽃을 좋아한다.",diff:["my favorite color","their smell","가장 좋아하는 색","그 꽃들의 향기"],y:"이유는 향기가 아니라 '색깔'이에요."}]},
{id:"d10",src:"대화",where:"Watch, Answer, and Role-play",en:"Emma: Hi, Jihan. What a surprise!\nJihan: Hey, Emma. Are you here to see the fireworks, too?",ko:"Emma: 안녕, 지한아. 정말 뜻밖이야!\n지한: 안녕, Emma. 너도 여기에 불꽃놀이 보러 왔니?",v:[
 {en:"Jihan asks if Emma came to watch the fireworks, too.",same:true,ko:"지한이는 Emma도 불꽃놀이를 보러 왔는지 묻는다.",sw:[["Are you here to","asks if Emma came to","~하러 왔니? = ~하러 왔는지 묻는다"],["see","watch","보다"]]},
 {en:"Emma is surprised to see Jihan.",same:true,ko:"Emma는 지한이를 보고 놀란다.",sw:[["What a surprise!","is surprised to see Jihan","정말 뜻밖이야! = 지한이를 보고 놀란다"]]},
 {en:"Emma and Jihan planned to meet to see the fireworks.",same:false,ko:"Emma와 지한이는 불꽃놀이를 보려고 만나기로 약속했다.",diff:["What a surprise!","planned to meet","정말 뜻밖이야!(우연히 만남)","만나기로 약속했다"],y:"What a surprise!는 '뜻밖이야!'예요. 약속하지 않고 우연히 만났어요."},
 {en:"Jihan asks if Emma is here to see the parade, too.",same:false,ko:"지한이는 Emma도 퍼레이드를 보러 왔는지 묻는다.",diff:["the fireworks","the parade","불꽃놀이","퍼레이드"],y:"두 사람은 불꽃놀이를 보러 왔어요."}]},
{id:"d11",src:"대화",where:"Watch, Answer, and Role-play",en:"Emma: Yes. I hear China, Italy, and the USA are participating this year.\nJihan: Don’t forget Korea.\nEmma: Of course, Korea, too.",ko:"Emma: 응. 올해는 중국, 이탈리아, 그리고 미국이 참가한다고 들었어.\n지한: 한국을 잊지 마.\nEmma: 물론, 한국도 있지.",v:[
 {en:"Emma hears China, Italy, and the USA are taking part this year.",same:true,ko:"Emma는 올해 중국, 이탈리아, 그리고 미국이 참가한다고 듣는다.",sw:[["are participating","are taking part","참가하다"]]},
 {en:"Korea is also participating this year.",same:true,ko:"한국도 올해 참가한다.",sw:[["Of course, Korea, too","Korea is also participating","물론, 한국도 = 한국도 참가한다"]]},
 {en:"Three countries are participating this year.",same:false,ko:"올해는 세 나라가 참가한다.",diff:["Korea, too","Three countries","한국도(모두 네 나라)","세 나라"],y:"중국, 이탈리아, 미국에 한국까지 모두 '네' 나라예요."},
 {en:"Jihan tells Emma not to forget Japan.",same:false,ko:"지한이는 Emma에게 일본을 잊지 말라고 한다.",diff:["Korea","Japan","한국","일본"],y:"지한이가 잊지 말라고 한 나라는 한국이에요."}]},
{id:"d12",src:"대화",where:"Watch, Answer, and Role-play",en:"Emma: So, the fireworks start at 7 p.m. Right?\nJihan: Yeah. Let’s do something together until then.",ko:"Emma: 그런데 불꽃놀이는 오후 7시에 시작해. 맞지?\n지한: 응. 그때까지 무언가 같이하자.",v:[
 {en:"The fireworks begin at 7 p.m.",same:true,ko:"불꽃놀이는 오후 7시에 시작한다.",sw:[["start","begin","시작하다"]]},
 {en:"Jihan suggests doing something together before 7 p.m.",same:true,ko:"지한이는 오후 7시 전까지 무언가를 같이하자고 제안한다.",sw:[["Let’s do","suggests doing","~하자 = ~하자고 제안한다"],["until then","before 7 p.m.","그때까지 = 오후 7시 전까지"]]},
 {en:"The fireworks end at 7 p.m.",same:false,ko:"불꽃놀이는 오후 7시에 끝난다.",diff:["start","end","시작하다","끝나다"],y:"불꽃놀이는 7시에 '시작'해요."},
 {en:"The fireworks start at 7 a.m.",same:false,ko:"불꽃놀이는 오전 7시에 시작한다.",diff:["p.m.","a.m.","오후","오전"],y:"p.m.은 오후, a.m.은 오전이에요. 불꽃놀이는 오후 7시예요."}]},
{id:"d13",src:"대화",where:"Watch, Answer, and Role-play",en:"Emma: I guess we can ride bikes or go for a boat ride. Which do you like more?\nJihan: Going for a boat ride. I think it’ll be more fun.",ko:"Emma: 자전거를 타거나 보트 타러 갈 수 있을 것 같아. 너는 어느 것이 더 좋니?\n지한: 보트 타러 가는 거. 그게 더 재미있을 것 같아.",v:[
 {en:"Jihan chooses a boat ride because he thinks it will be more fun.",same:true,ko:"지한이는 보트 타기가 더 재미있을 거라고 생각해서 보트 타기를 고른다.",sw:[["Going for a boat ride","chooses a boat ride","보트 타러 가는 거 = 보트 타기를 고른다"],["it’ll","it will","~일 것이다"]]},
 {en:"Jihan thinks a boat ride will be more fun than riding bikes.",same:true,ko:"지한이는 보트 타기가 자전거 타기보다 더 재미있을 거라고 생각한다.",sw:[["more fun","more fun than riding bikes","더 재미있는 = 자전거 타기보다 더 재미있는"]]},
 {en:"Jihan wants to ride bikes.",same:false,ko:"지한이는 자전거를 타고 싶어 한다.",diff:["Going for a boat ride","ride bikes","보트 타러 가기","자전거 타기"],y:"지한이가 고른 건 보트 타기예요."},
 {en:"Jihan thinks a boat ride will be less fun.",same:false,ko:"지한이는 보트 타기가 덜 재미있을 거라고 생각한다.",diff:["more fun","less fun","더 재미있는","덜 재미있는"],y:"지한이는 보트 타기가 '더' 재미있을 것 같다고 했어요."}]},
{id:"d14",src:"대화",where:"Listen Up",en:"M: Welcome to the ABC World Food Festival! Every year, we invite great chefs from around the world. This year, we invited Mr. Kumar, a world-famous Indian chef.",ko:"M: ABC 세계 음식 축제에 오신 것을 환영합니다! 매년 우리는 전 세계에서 훌륭한 요리사들을 초대합니다. 올해는 세계적으로 유명한 인도 요리사 Kumar 씨를 초대했습니다.",v:[
 {en:"This year, Mr. Kumar, a world-famous Indian chef, was invited to the ABC World Food Festival.",same:true,ko:"올해 세계적으로 유명한 인도 요리사 Kumar 씨가 ABC 세계 음식 축제에 초대되었다.",sw:[["we invited Mr. Kumar","Mr. Kumar … was invited","우리는 Kumar 씨를 초대했다 = Kumar 씨가 초대되었다"]]},
 {en:"Each year, great chefs from all over the world are invited to the festival.",same:true,ko:"매년 전 세계의 훌륭한 요리사들이 그 축제에 초대된다.",sw:[["Every year","Each year","매년"],["around the world","all over the world","전 세계"],["we invite great chefs","great chefs … are invited","우리는 요리사들을 초대한다 = 요리사들이 초대된다"]]},
 {en:"This year, the festival invited Mr. Kumar, a world-famous Italian chef.",same:false,ko:"올해 그 축제는 세계적으로 유명한 이탈리아 요리사 Kumar 씨를 초대했다.",diff:["Indian","Italian","인도의","이탈리아의"],y:"Kumar 씨는 '인도' 요리사예요."},
 {en:"Every year, the festival invites great chefs only from India.",same:false,ko:"매년 그 축제는 인도에서만 훌륭한 요리사들을 초대한다.",diff:["from around the world","only from India","전 세계에서","인도에서만"],y:"매년 '전 세계'에서 요리사를 초대해요. 올해 온 Kumar 씨가 인도 사람일 뿐이에요."}]},
{id:"d15",src:"대화",where:"Listen Up",en:"M: Do you like Indian food? Then, don’t miss his cooking class. You can also get his recipe book for free.",ko:"M: 인도 음식을 좋아하시나요? 그렇다면 그의 요리 수업을 놓치지 마세요. 또한, 그의 요리책을 무료로 받으실 수 있습니다.",v:[
 {en:"If you like Indian food, make sure to go to his cooking class.",same:true,ko:"인도 음식을 좋아한다면, 그의 요리 수업에 꼭 가세요.",sw:[["Do you like Indian food? Then,","If you like Indian food,","인도 음식을 좋아하나요? 그렇다면 = 인도 음식을 좋아한다면"],["don’t miss","make sure to go to","놓치지 마세요 = 꼭 가세요"]]},
 {en:"You can also get his recipe book without paying.",same:true,ko:"또한 그의 요리책을 돈을 내지 않고 받을 수 있다.",sw:[["for free","without paying","무료로 = 돈을 내지 않고"]]},
 {en:"You can also get his recipe book at a low price.",same:false,ko:"또한 그의 요리책을 싼 가격에 받을 수 있다.",diff:["for free","at a low price","무료로","싼 가격에"],y:"요리책은 '공짜'예요. 싸게 사는 게 아니에요."},
 {en:"Don’t miss his baking class.",same:false,ko:"그의 제빵 수업을 놓치지 마세요.",diff:["cooking","baking","요리","제빵(빵 굽기)"],y:"Kumar 씨의 수업은 요리(cooking) 수업이에요."}]},
{id:"d16",src:"대화",where:"Wrap Up 1",en:"B: Let’s go to the movies this weekend.\nG: I’m sorry, but I can’t. I have an exam on Monday.",ko:"B: 이번 주말에 영화 보러 가자.\nG: 미안하지만 못 가. 월요일에 시험이 있거든.",v:[
 {en:"The girl can’t go to the movies because she has a test on Monday.",same:true,ko:"소녀는 월요일에 시험이 있어서 영화를 보러 갈 수 없다.",sw:[["exam","test","시험"]]},
 {en:"The girl says no to the boy’s idea because of her exam on Monday.",same:true,ko:"소녀는 월요일 시험 때문에 소년의 제안을 거절한다.",sw:[["I’m sorry, but I can’t","says no to the boy’s idea","미안하지만 못 가 = 소년의 제안을 거절한다"]]},
 {en:"The girl has an exam on Friday.",same:false,ko:"소녀는 금요일에 시험이 있다.",diff:["Monday","Friday","월요일","금요일"],y:"시험은 월요일(Monday)이에요."},
 {en:"The girl will go to the movies this weekend.",same:false,ko:"소녀는 이번 주말에 영화를 보러 갈 것이다.",diff:["I can’t","will go","못 간다","갈 것이다"],y:"소녀는 시험 때문에 '못 간다'고 했어요."}]},
{id:"d17",src:"대화",where:"Wrap Up 1",en:"B: So, you’re going to be in the library all weekend?\nG: No. I’ll be home. I like studying at home more than at the library.",ko:"B: 그럼 주말 내내 도서관에 있을 거야?\nG: 아니. 집에 있을 거야. 나는 도서관에서보다 집에서 공부하는 것이 더 좋아.",v:[
 {en:"The girl prefers studying at home to studying at the library.",same:true,ko:"소녀는 도서관에서 공부하는 것보다 집에서 공부하는 것을 더 좋아한다.",sw:[["like studying at home more than at the library","prefers studying at home to studying at the library","도서관보다 집에서 공부하는 것을 더 좋아한다"]]},
 {en:"The girl will stay home this weekend.",same:true,ko:"소녀는 이번 주말에 집에 있을 것이다.",sw:[["I’ll be home","will stay home","집에 있을 것이다"]]},
 {en:"The girl will be in the library all weekend.",same:false,ko:"소녀는 주말 내내 도서관에 있을 것이다.",diff:["No. I’ll be home","will be in the library","아니, 집에 있을 거야","도서관에 있을 것이다"],y:"소녀는 '아니'라고 하고 집에 있겠다고 했어요."},
 {en:"The girl likes studying at the library more than at home.",same:false,ko:"소녀는 집에서보다 도서관에서 공부하는 것을 더 좋아한다.",diff:["at home more than at the library","at the library more than at home","도서관보다 집","집보다 도서관"],y:"소녀는 '집'에서 공부하는 게 더 좋다고 했어요. 장소가 거꾸로 바뀌었어요."}]},
{id:"d18",src:"대화",where:"Wrap Up 2",en:"B: I’m looking for a gift for my grandmother.\nW: How about this bag?\nB: It’s too big. I think it’ll be heavy, too.\nW: Not at all. It’s big but very light.",ko:"B: 할머니께 드릴 선물을 찾고 있어요.\nW: 이 가방은 어때요?\nB: 너무 커요. 무겁기도 할 것 같아요.\nW: 전혀 그렇지 않아요. 크지만 아주 가벼워요.",v:[
 {en:"The boy is looking for a present for his grandmother.",same:true,ko:"소년은 할머니께 드릴 선물을 찾고 있다.",sw:[["gift","present","선물"],["my grandmother","his grandmother","내 할머니 = 그의 할머니"]]},
 {en:"The woman says the bag is big, but it is not heavy.",same:true,ko:"여자는 그 가방이 크지만 무겁지 않다고 말한다.",sw:[["very light","not heavy","아주 가벼운 = 무겁지 않은"]]},
 {en:"The boy is looking for a gift for his grandfather.",same:false,ko:"소년은 할아버지께 드릴 선물을 찾고 있다.",diff:["grandmother","grandfather","할머니","할아버지"],y:"선물은 할머니(grandmother)께 드릴 거예요."},
 {en:"The woman says the bag is big and very heavy.",same:false,ko:"여자는 그 가방이 크고 아주 무겁다고 말한다.",diff:["big but very light","big and very heavy","크지만 아주 가볍다","크고 아주 무겁다"],y:"점원은 가방이 '가볍다'고 했어요. 무겁다는 건 소년의 걱정이었어요."}]},
{id:"d19",src:"대화",where:"Wrap Up 2",en:"W: It’s perfect for older women.\nB: Really? Then, I’ll take it.",ko:"W: 나이 드신 여성분들께 딱 맞아요.\nB: 정말요? 그럼 그걸로 살게요.",v:[
 {en:"The boy decides to buy the bag.",same:true,ko:"소년은 그 가방을 사기로 결정한다.",sw:[["I’ll take it","decides to buy the bag","그걸로 살게요 = 가방을 사기로 한다"]]},
 {en:"The woman thinks the bag is just right for older women.",same:true,ko:"여자는 그 가방이 나이 드신 여성들에게 딱 알맞다고 생각한다.",sw:[["perfect","just right","딱 맞는"]]},
 {en:"The boy decides not to buy the bag.",same:false,ko:"소년은 그 가방을 사지 않기로 결정한다.",diff:["I’ll take it","decides not to buy","그걸로 살게요","사지 않기로 한다"],y:"I’ll take it.은 '그걸로 살게요'라는 뜻이에요. 가방을 사요."},
 {en:"The woman says the bag is perfect for young women.",same:false,ko:"여자는 그 가방이 젊은 여성들에게 딱 맞다고 말한다.",diff:["older","young","나이 드신","젊은"],y:"점원은 '나이 드신' 여성분께 딱 맞다고 했어요."}]}
]};
