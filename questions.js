// Question Bank for Graph Algorithms Exam Simulation Game
// Based directly on "Graph Algorithms Presentation" (27 Slides)

const QUESTION_BANK = [
  // ==================== CHAPTER 1: GRAPH BASICS & TYPES ====================
  {
    id: "g1_1",
    chapter: 1,
    chapterTitle: "บทที่ 1: พื้นฐานและประเภทของกราฟ",
    topic: "concept",
    question: "ในนิยามของกราฟทางคณิตศาสตร์ G = (V, E) ตัวอักษร V และ E หมายถึงอะไรตามลำดับ?",
    options: [
      "V = Vertex (จุดยอด), E = Edge (เส้นเชื่อม)",
      "V = Value (ค่าน้ำหนัก), E = Element (สมาชิก)",
      "V = Vector (เวกเตอร์), E = Edge (เส้นเชื่อม)",
      "V = Vertex (จุดยอด), E = Entry (ทางเข้า)"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 3: กราฟ G = (V, E) โดย V คือเซตของจุดยอด (Vertex / Node) แทนสิ่งที่เราสนใจ และ E คือเซตของเส้นเชื่อม (Edge) แทนความสัมพันธ์ระหว่างจุดยอด",
    slideRef: "สไลด์หน้า 3"
  },
  {
    id: "g1_2",
    chapter: 1,
    chapterTitle: "บทที่ 1: พื้นฐานและประเภทของกราฟ",
    topic: "concept",
    question: "ข้อใดจัดเป็นตัวอย่างของ 'Directed Graph' (กราฟมีทิศทาง) ในชีวิตจริง?",
    options: [
      "ไฮเปอร์ลิงก์บนหน้าเว็บ (Web Links) และถนนเดินรถทางเดียว",
      "ถนนสองทางที่รถสามารถวิ่งสวนกันได้",
      "เครือข่ายเพื่อนบน Facebook ที่ต้องกดยอมรับทั้งสองฝ่าย",
      "สายเคเบิลไฟฟ้าเชื่อมต่อระหว่างเสาไฟฟ้าสองต้น"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 4: Directed Graph เส้นเชื่อมมีทิศทาง (ทางเดียว) เช่น ลิงก์เว็บ (จากหน้า A ชี้ไปหน้า B ไม่ได้แปลว่า B ชี้กลับ A) หรือถนนเดินรถทางเดียว",
    slideRef: "สไลด์หน้า 4"
  },
  {
    id: "g1_3",
    chapter: 1,
    chapterTitle: "บทที่ 1: พื้นฐานและประเภทของกราฟ",
    topic: "concept",
    question: "กราฟประเภทใดที่เหมาะสำหรับการสร้างระบบ 'Task Scheduling' หรือ 'ลำดับการลงทะเบียนวิชาที่ต้องผ่านตัวต่อ (Prerequisites)' มากที่สุด?",
    options: [
      "DAG (Directed Acyclic Graph)",
      "Cyclic Undirected Graph",
      "Dense Weighted Graph with Cycles",
      "Complete Graph"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 4: DAG (Directed Acyclic Graph) คือกราฟที่มีทิศทางและ 'ไม่มีวงจร' (Acyclic) จึงนิยมใช้จัดลำดับงาน (Task Scheduling) และวิชาพรีเรเควสิต เพราะต้องไม่มีวงจรที่วนกลับมาเริ่มใหม่ไม่ได้",
    slideRef: "สไลด์หน้า 4"
  },
  {
    id: "g1_4",
    chapter: 1,
    chapterTitle: "บทที่ 1: พื้นฐานและประเภทของกราฟ",
    topic: "concept",
    question: "กราฟที่มีเส้นทางเดินจากจุดหนึ่ง แล้วสามารถเดินวนกลับมายังจุดเดิมได้ เรียกว่ากราฟประเภทใด?",
    options: [
      "Cyclic Graph (กราฟมีวงจร)",
      "Acyclic Graph (กราฟไม่มีวงจร)",
      "Bipartite Graph",
      "Disconnected Graph"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 4: Cyclic Graph คือกราฟที่มีวงจร (Cycle) กล่าวคือมีเส้นทางที่เดินวนกลับมายังจุดเริ่มต้นเดิมได้",
    slideRef: "สไลด์หน้า 4"
  },
  {
    id: "g1_5",
    chapter: 1,
    chapterTitle: "บทที่ 1: พื้นฐานและประเภทของกราฟ",
    topic: "concept",
    question: "ใน Weighted Graph ค่าน้ำหนัก (Weight) บนเส้นเชื่อม (Edge) มักแทนสิ่งใดในแอปพลิเคชันแผนที่นำทาง?",
    options: [
      "ระยะทาง หรือเวลา หรือค่าใช้จ่ายในการเดินทางระหว่างจุดยอด",
      "จำนวนจุดยอดทั้งหมดในระบบ",
      "จำนวนรอบที่ค้นหาเส้นทาง",
      "ระดับความลึกในการทำ DFS"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 4: Weighted Graph มีน้ำหนัก (Weight) บนเส้นเชื่อม เช่น แผนที่ระยะทาง (Distance), เวลาที่ใช้, หรือค่าเดินทาง",
    slideRef: "สไลด์หน้า 4"
  },

  // ==================== CHAPTER 2: GRAPH REPRESENTATIONS ====================
  {
    id: "g2_1",
    chapter: 2,
    chapterTitle: "บทที่ 2: การแทนกราฟ (Matrix vs List)",
    topic: "representation",
    question: "หากกราฟมีจำนวนเส้นเชื่อมเบาบางมากเมื่อเทียบกับจำนวนจุดยอด (|E| << |V|²) โครงสร้างข้อมูลแบบใดประหยัดหน่วยความจำมากกว่า?",
    options: [
      "Adjacency List (รายการประชิด)",
      "Adjacency Matrix (เมทริกซ์ประชิด)",
      "Incidence Matrix ขนาด V x E",
      "All-Pairs Distance Table"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 9: Sparse Graph (กราฟเบาบาง |E| << |V|²) เหมาะกับ Adjacency List เพราะใช้พื้นที่ O(V + E) ประหยัดพื้นที่จัดเก็บและไม่เสียพื้นที่เก็บค่า 0 เหมือน Matrix",
    slideRef: "สไลด์หน้า 9, 11"
  },
  {
    id: "g2_2",
    chapter: 2,
    chapterTitle: "บทที่ 2: การแทนกราฟ (Matrix vs List)",
    topic: "representation",
    question: "ข้อดีที่เด่นชัดที่สุดของ 'Adjacency Matrix' เมื่อเทียบกับ 'Adjacency List' คืออะไร?",
    options: [
      "สามารถตรวจสอบว่ามีเส้นเชื่อมระหว่างจุดยอด u และ v หรือไม่ ได้ในเวลา O(1)",
      "ใช้หน่วยความจำน้อยกว่าเสมอไม่ว่ากราฟจะเป็นแบบใด",
      "ท่องไปยังเพื่อนบ้านของจุดยอดได้เร็วกว่าในเวลา O(1)",
      "รองรับการเพิ่มจุดยอดใหม่ได้ง่ายโดยไม่ต้องขยายตาราง"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 10: ข้อดีของ Adjacency Matrix คือตรวจสอบเส้นเชื่อม (matrix[u][v]) ได้ในเวลา O(1) ทันที!",
    slideRef: "สไลด์หน้า 10"
  },
  {
    id: "g2_3",
    chapter: 2,
    chapterTitle: "บทที่ 2: การแทนกราฟ (Matrix vs List)",
    topic: "representation",
    question: "การแทนกราฟด้วย Adjacency Matrix ขนาดจุดยอด V จุด จะต้องใช้พื้นที่หน่วยความจำ (Space Complexity) เท่าใด?",
    options: [
      "O(V²)",
      "O(V + E)",
      "O(E log V)",
      "O(V log V)"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 10: Adjacency Matrix ใช้ตาราง 2 มิติขนาด V × V เสมอ ดังนั้น Space Complexity จึงเป็น O(V²)",
    slideRef: "สไลด์หน้า 10"
  },
  {
    id: "g2_4",
    chapter: 2,
    chapterTitle: "บทที่ 2: การแทนกราฟ (Matrix vs List)",
    topic: "representation",
    question: "ในกราฟแบบไม่ระบุทิศทาง (Undirected Graph) ลักษณะของ Adjacency Matrix จะมีสมบัติพิเศษอย่างไร?",
    options: [
      "เป็นเมทริกซ์สมมาตร (Symmetric Matrix) ตามแนวทแยงมุมหลัก กล่าวคือ matrix[i][j] = matrix[j][i]",
      "ค่าในแนวทแยงมุมหลักต้องเป็น 1 เสมอ",
      "แถวแรกจะมีค่าเป็นศูนย์ทั้งหมด",
      "ผลรวมของค่าในตารางต้องเท่ากับจำนวนจุดยอด V พอดี"
    ],
    answer: 0,
    explanation: "เนื่องจาก Undirected Graph เป็นเส้นเชื่อมสองทาง ถ้ามีเส้นเชื่อมระหว่าง i กับ j จะทำให้มีเส้นเชื่อมทั้ง i->j และ j->i ทำให้ matrix[i][j] == matrix[j][i] จึงเป็นเมทริกซ์สมมาตร (ตามสไลด์หน้า 10)",
    slideRef: "สไลด์หน้า 10"
  },
  {
    id: "g2_5",
    chapter: 2,
    chapterTitle: "บทที่ 2: การแทนกราฟ (Matrix vs List)",
    topic: "representation",
    question: "หากต้องการตรวจสอบว่าจุดยอด u เชื่อมต่อไปยัง v หรือไม่ โดยใช้ 'Adjacency List' จะใช้เวลาเฉลี่ยเท่าใด?",
    options: [
      "O(degree(u)) ซึ่งขึ้นกับจำนวนเพื่อนบ้านของ u",
      "O(1) คงที่เสมอ",
      "O(V²)",
      "O(log V)"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 11: ข้อเสียของ Adjacency List คือการตรวจสอบเส้นเชื่อมต้องค้นหาในรายการเพื่อนบ้านของ u จึงใช้เวลาช้ากว่าคือ O(degree)",
    slideRef: "สไลด์หน้า 11"
  },

  // ==================== CHAPTER 3: BFS & DFS ====================
  {
    id: "g3_1",
    chapter: 3,
    chapterTitle: "บทที่ 3: การท่องกราฟ BFS vs DFS",
    topic: "traversal",
    question: "Breadth-First Search (BFS) ใช้โครงสร้างข้อมูลใดในการควบคุมลำดับการสำรวจจุดยอด?",
    options: [
      "Queue (คิว) ทำงานแบบ FIFO (First In, First Out)",
      "Stack (สแตก) ทำงานแบบ LIFO (Last In, First Out)",
      "Priority Queue (คิวลำดับความสำคัญ)",
      "Disjoint Set (Union-Find)"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 12: BFS สำรวจทีละระดับ (Level by level) โดยใช้ Queue (FIFO) + Visited Set",
    slideRef: "สไลด์หน้า 12"
  },
  {
    id: "g3_2",
    chapter: 3,
    chapterTitle: "บทที่ 3: การท่องกราฟ BFS vs DFS",
    topic: "traversal",
    question: "Depth-First Search (DFS) ใช้โครงสร้างข้อมูลหรือกลไกใดในการทำงาน?",
    options: [
      "Stack (สแตก) ทำงานแบบ LIFO หรือฟังก์ชันเวียนเกิด (Recursion / Call Stack)",
      "Queue (คิว) ทำงานแบบ FIFO",
      "Binary Search Tree",
      "Min-Heap"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 14: DFS ท่องไปแบบลึกสุดก่อนย้อนกลับ (Backtrack) โดยใช้ Stack หรือ Recursion (LIFO) + Visited Set",
    slideRef: "สไลด์หน้า 14"
  },
  {
    id: "g3_3",
    chapter: 3,
    chapterTitle: "บทที่ 3: การท่องกราฟ BFS vs DFS",
    topic: "traversal",
    question: "ข้อใดเป็นคุณสมบัติเด่นของ BFS เมื่อใช้กับกราฟที่ 'ไม่มีค่าน้ำหนัก' (Unweighted Graph)?",
    options: [
      "สามารถหาเส้นทางที่สั้นที่สุด (Shortest Path โดยนับจำนวนเส้นเชื่อม) จากจุดเริ่มต้นไปยังจุดอื่นได้",
      "ใช้หน่วยความจำน้อยกว่า DFS เสมอในทุกกรณี",
      "ทำงานได้เฉพาะกับ Directed Acyclic Graph (DAG) เท่านั้น",
      "ตรวจจับวงจรได้เร็วกว่า DFS"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 12 และ 16: BFS การันตีการหาเส้นทางที่สั้นที่สุด (Shortest Path) บน Unweighted Graph ได้ เพราะสำรวจกระจายออกไปทีละระดับ (Level by Level)",
    slideRef: "สไลด์หน้า 12, 16"
  },
  {
    id: "g3_4",
    chapter: 3,
    chapterTitle: "บทที่ 3: การท่องกราฟ BFS vs DFS",
    topic: "traversal",
    question: "จากการ Trace BFS ในสไลด์หน้า 13 (graph: 0->[1,2], 1->[0,3,4], 2->[0,5], 3->[1], 4->[1,5], 5->[2,4]) ลำดับการท่องไปของ BFS เริ่มต้นจาก 0 คือข้อใด?",
    options: [
      "0 → 1 → 2 → 3 → 4 → 5",
      "0 → 1 → 3 → 4 → 5 → 2",
      "0 → 2 → 5 → 4 → 1 → 3",
      "0 → 5 → 4 → 3 → 2 → 1"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 13: ผลลัพธ์ BFS คือ 0 → 1 → 2 → 3 → 4 → 5 (ระดับ 0: [0], ระดับ 1: [1, 2], ระดับ 2: [3, 4, 5])",
    slideRef: "สไลด์หน้า 13"
  },
  {
    id: "g3_5",
    chapter: 3,
    chapterTitle: "บทที่ 3: การท่องกราฟ BFS vs DFS",
    topic: "traversal",
    question: "จากการ Trace DFS ในสไลด์หน้า 15 เริ่มต้นจากจุดยอด 0 ลำดับการท่องไปตามสไลด์คือข้อใด?",
    options: [
      "0 → 1 → 3 → 4 → 5 → 2",
      "0 → 1 → 2 → 3 → 4 → 5",
      "0 → 2 → 1 → 3 → 4 → 5",
      "0 → 3 → 1 → 4 → 5 → 2"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 15: ผลลัพธ์ DFS คือ 0 → 1 → 3 → 4 → 5 → 2 (0 ดำดิ่งไป 1 -> 3 -> backtrack -> 4 -> 5 -> 2)",
    slideRef: "สไลด์หน้า 15"
  },
  {
    id: "g3_6",
    chapter: 3,
    chapterTitle: "บทที่ 3: การท่องกราฟ BFS vs DFS",
    topic: "traversal",
    question: "Time Complexity ของทั้ง BFS และ DFS เมื่อแทนกราฟด้วย Adjacency List คือข้อใด?",
    options: [
      "O(V + E)",
      "O(V²)",
      "O(E log V)",
      "O(V log E)"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 12, 14 และ 16: ทั้ง BFS และ DFS มี Time Complexity เท่ากันคือ O(V + E) เพราะต้องเข้าชมทุกจุดยอด (V) และสำรวจทุกเส้นเชื่อม (E)",
    slideRef: "สไลด์หน้า 16, 26"
  },
  {
    id: "g3_7",
    chapter: 3,
    chapterTitle: "บทที่ 3: การท่องกราฟ BFS vs DFS",
    topic: "traversal",
    question: "ทำไม BFS มักใช้หน่วยความจำ (Memory / Space) ในสถานการณ์จริงมากกว่า DFS?",
    options: [
      "เพราะ BFS ต้องเก็บจุดยอดทั้งหมดในระดับ (Level) เดียวกันไว้ใน Queue พร้อมกัน",
      "เพราะ BFS ต้องเก็บเส้นเชื่อมทั้งหมดซ้ำสองครั้ง",
      "เพราะ BFS ใช้ Call Stack ของระบบทำให้เกิด Stack Overflow",
      "เพราะ BFS ต้องคำนวณค่าน้ำหนักของเส้นทางล่วงหน้า"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 16: BFS ใช้หน่วยความจำมากกว่าเพราะต้องเก็บจุดยอดทั้งระดับ (Level) ไว้ใน Queue ในขณะที่ DFS เก็บเฉพาะเส้นทางตามความลึกปัจจุบันเท่านั้น",
    slideRef: "สไลด์หน้า 16"
  },
  {
    id: "g3_8",
    chapter: 3,
    chapterTitle: "บทที่ 3: การท่องกราฟ BFS vs DFS",
    topic: "traversal",
    question: "การประยุกต์ใช้เช่น 'Cycle Detection' (ตรวจจับวงจร), 'Topological Sort', และ 'Maze Solving' นิยมใช้อัลกอริทึมใดมากกว่า?",
    options: [
      "DFS (Depth-First Search)",
      "BFS (Breadth-First Search)",
      "Prim's Algorithm",
      "Kruskal's Algorithm"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 14 และ 16: DFS เหมาะและนิยมใช้สำหรับ Cycle Detection, Topological Sort, Maze Solving และ Strongly Connected Components (SCC)",
    slideRef: "สไลด์หน้า 14, 16"
  },

  // ==================== CHAPTER 4: MINIMUM SPANNING TREE (MST) ====================
  {
    id: "g4_1",
    chapter: 4,
    chapterTitle: "บทที่ 4: ต้นไม้แผ่ทั่วน้อยสุด (MST: Prim & Kruskal)",
    topic: "mst",
    question: "กราฟที่มีจุดยอด V จุด หากเชื่อมต่อกันเป็น Spanning Tree (ต้นไม้แผ่ทั่ว) จะมีจำนวนเส้นเชื่อม (Edges) ทั้งสิ้นกี่เส้นพอดี?",
    options: [
      "V - 1 เส้น",
      "V เส้น",
      "V + 1 เส้น",
      "V / 2 เส้น"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 18: นิยามสำคัญของ Spanning Tree คือต้องเชื่อมต่อครบทุกจุดยอด และมีจำนวนเส้นเชื่อมเป๊ะๆ คือ V - 1 เส้น (ไม่มีวงจร/No Cycle)",
    slideRef: "สไลด์หน้า 18"
  },
  {
    id: "g4_2",
    chapter: 4,
    chapterTitle: "บทที่ 4: ต้นไม้แผ่ทั่วน้อยสุด (MST: Prim & Kruskal)",
    topic: "mst",
    question: "โจทย์ทางวิศวกรรมประเภท 'การวางสายเคเบิลอินเทอร์เน็ตเชื่อมเมืองทุกเมืองด้วยต้นทุนรวมที่ต่ำที่สุด' ตรงกับปัญหาใดในทฤษฎีกราฟ?",
    options: [
      "Minimum Spanning Tree (MST)",
      "Single-Source Shortest Path",
      "Maximum Flow Problem",
      "Traveling Salesperson Problem (TSP)"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 18: การประยุกต์ใช้จริงของ MST ได้แก่ วางสายเคเบิลเชื่อมเมืองด้วยต้นทุนต่ำสุด, ออกแบบเครือข่ายคอมพิวเตอร์, วางท่อน้ำและเสาไฟฟ้า",
    slideRef: "สไลด์หน้า 18"
  },
  {
    id: "g4_3",
    chapter: 4,
    chapterTitle: "บทที่ 4: ต้นไม้แผ่ทั่วน้อยสุด (MST: Prim & Kruskal)",
    topic: "mst",
    question: "Prim's Algorithm มีกลยุทธ์หลัก (Strategy) ในการเลือกเส้นเชื่อมเข้าสู่ MST อย่างไร?",
    options: [
      "เริ่มจากจุดยอดหนึ่ง แล้วเลือกเส้นเชื่อมที่มีค่าน้ำหนักน้อยที่สุดที่เชื่อมระหว่างจุดใน MST กับจุดนอก MST ทีละเส้น",
      "เรียงลำดับเส้นเชื่อมทั้งหมดในกราฟจากน้อยไปมาก แล้วเลือกตามลำดับ",
      "เลือกเส้นทางที่มีผลรวมระยะทางจากจุดเริ่มต้นน้อยที่สุดเสมอ",
      "ตัดเส้นเชื่อมที่มีน้ำหนักมากที่สุดทิ้งทีละเส้นจนกว่าจะไม่มีวงจร"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 20: Prim ขยายต้นไม้ออกไปทีละเส้น โดยเลือก edge ที่มีน้ำหนักน้อยสุดที่เชื่อมระหว่างเซตจุดยอดใน MST กับจุดยอดนอก MST เสมอ (Greedy)",
    slideRef: "สไลด์หน้า 20"
  },
  {
    id: "g4_4",
    chapter: 4,
    chapterTitle: "บทที่ 4: ต้นไม้แผ่ทั่วน้อยสุด (MST: Prim & Kruskal)",
    topic: "mst",
    question: "Kruskal's Algorithm อาศัยโครงสร้างข้อมูลใดในการตรวจสอบว่าการเพิ่มเส้นเชื่อมใหม่จะทำให้เกิด 'วงจร' (Cycle) หรือไม่?",
    options: [
      "Disjoint Set / Union-Find (find และ union)",
      "Stack สำหรับทำ Backtracking",
      "FIFO Queue",
      "Adjacency Matrix ขนาด V x V"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 21: Kruskal ใช้ Union-Find (Disjoint Set) โดยตรวจ find(u) == find(v) หากเป็นกลุ่มเดียวกันการใส่ edge จะเกิดวงจร จึงข้ามไป",
    slideRef: "สไลด์หน้า 21"
  },
  {
    id: "g4_5",
    chapter: 4,
    chapterTitle: "บทที่ 4: ต้นไม้แผ่ทั่วน้อยสุด (MST: Prim & Kruskal)",
    topic: "mst",
    question: "จาก Trace ของ Kruskal ในสไลด์หน้า 21 เมื่อพิจารณาเส้นเชื่อม A-B(4) ทำไมจึงถูกปฏิเสธ (ข้าม ไม่เลือกเข้า MST)?",
    options: [
      "เพราะก่อนหน้านี้เลือก B-C(1) และ A-C(2) เข้าไปแล้ว ทำให้ A กับ B อยู่ในกลุ่มเดียวกัน การเพิ่ม A-B จะทำให้เกิด Cycle!",
      "เพราะน้ำหนัก 4 มีค่ามากกว่าน้ำหนักเส้นเชื่อม B-D(5)",
      "เพราะจุดยอด A มีเส้นเชื่อมเกิน 2 เส้นแล้ว",
      "เพราะ Kruskal บังคับให้เลือกเฉพาะเส้นเชื่อมที่มีค่าน้ำหนักเป็นเลขคี่"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 21: เลือก B-C(1) และ A-C(2) แล้ว เมื่อตรวจ A-B(4) พบว่า find(A) == find(B) (อยู่ใน Connected Component เดียวกัน) จะเกิดวงจร A-C-B-A จึงต้องข้าม!",
    slideRef: "สไลด์หน้า 21"
  },
  {
    id: "g4_6",
    chapter: 4,
    chapterTitle: "บทที่ 4: ต้นไม้แผ่ทั่วน้อยสุด (MST: Prim & Kruskal)",
    topic: "mst",
    question: "จากตัวอย่างกราฟ 5 จุดยอด (A, B, C, D, E) ในสไลด์หน้า 20 และ 21 ผลรวมน้ำหนักรวมของ Minimum Spanning Tree มีค่าเท่าใด?",
    options: [
      "10",
      "12",
      "14",
      "8"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 20 และ 21: ผลรวมค่าน้ำหนักของเส้นเชื่อมใน MST = 1 + 2 + 2 + 5 = 10 (เส้นเชื่อมที่ได้คือ B-C(1), A-C(2), D-E(2), B-D(5))",
    slideRef: "สไลด์หน้า 20, 21"
  },

  // ==================== CHAPTER 5: DIJKSTRA'S SHORTEST PATH ====================
  {
    id: "g5_1",
    chapter: 5,
    chapterTitle: "บทที่ 5: เส้นทางสั้นที่สุด (Dijkstra's Algorithm)",
    topic: "shortest_path",
    question: "ข้อใดคือ 'ข้อจำกัดที่สำคัญที่สุด' ของ Dijkstra's Algorithm ที่มักออกสอบบ่อยครั้ง?",
    options: [
      "เส้นเชื่อมต้องไม่มีค่าน้ำหนักเป็นลบ (Non-negative weights only)",
      "กราฟต้องเป็น Undirected Graph เท่านั้น",
      "กราฟต้องไม่มีวงจร (ต้องเป็น DAG)",
      "ต้องมีจำนวนจุดยอดไม่เกิน 1,000 จุด"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 22: Dijkstra ใช้ได้เฉพาะ 'น้ำหนักไม่เป็นลบ' (Non-negative weights) เท่านั้น! หากมีน้ำหนักติดลบ กลยุทธ์ Greedy จะผิดพลาดและให้ผลลัพธ์ไม่ถูกต้อง",
    slideRef: "สไลด์หน้า 22, 25"
  },
  {
    id: "g5_2",
    chapter: 5,
    chapterTitle: "บทที่ 5: เส้นทางสั้นที่สุด (Dijkstra's Algorithm)",
    topic: "shortest_path",
    question: "ขั้นตอนการปรับปรุงระยะทางใน Dijkstra ที่เรียกว่า 'Relaxation' มีสูตรเงื่อนไขตามข้อใด?",
    options: [
      "if dist[u] + w(u, v) < dist[v] then dist[v] = dist[u] + w(u, v)",
      "if dist[u] + dist[v] < w(u, v) then dist[v] = dist[u]",
      "if w(u, v) < dist[v] then dist[v] = w(u, v)",
      "if dist[v] - w(u, v) < dist[u] then dist[u] = dist[v]"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 22: Relaxation คือ if dist[u] + w(u, v) < dist[v] → อัปเดต dist[v] = dist[u] + w(u, v) และใส่ v ลงใน Priority Queue",
    slideRef: "สไลด์หน้า 22"
  },
  {
    id: "g5_3",
    chapter: 5,
    chapterTitle: "บทที่ 5: เส้นทางสั้นที่สุด (Dijkstra's Algorithm)",
    topic: "shortest_path",
    question: "ในการเริ่มทำงานของ Dijkstra ค่าระยะทาง dist[] ของจุดเริ่มต้น (Source) และจุดยอดอื่นๆ จะถูกตั้งต้นเป็นค่าใด?",
    options: [
      "dist[start] = 0, จุดยอดอื่นๆ = ∞ (อนันต์)",
      "dist[start] = 1, จุดยอดอื่นๆ = 0",
      "dist ทุกจุด = 0",
      "dist ทุกจุด = ∞ (อนันต์)"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 22: ขั้นตอนที่ 1 กำหนด dist[เริ่ม] = 0, จุดยอดอื่น = ∞ แล้วใส่จุดเริ่มต้นลงใน Priority Queue",
    slideRef: "สไลด์หน้า 22"
  },
  {
    id: "g5_4",
    chapter: 5,
    chapterTitle: "บทที่ 5: เส้นทางสั้นที่สุด (Dijkstra's Algorithm)",
    topic: "shortest_path",
    question: "จากการ Trace Dijkstra ในสไลด์หน้า 24 จากจุดเริ่มต้น A ไปยังจุดยอด B ระยะทางที่สั้นที่สุดคือเท่าใด และผ่านเส้นทางใด?",
    options: [
      "ระยะทาง = 3, เส้นทาง: A → C → B",
      "ระยะทาง = 4, เส้นทาง: A → B โดยตรง",
      "ระยะทาง = 5, เส้นทาง: A → C → D → B",
      "ระยะทาง = 2, เส้นทาง: A → B"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 24: แม้จะมีเส้นเชื่อมตรง A-B(4) แต่เมื่อผ่าน C(2) แล้วต่อด้วย C-B(1) จะได้ 2+1 = 3 ซึ่งสั้นกว่า! ดังนั้นระยะทางสั้นสุดคือ 3 เส้นทาง A → C → B",
    slideRef: "สไลด์หน้า 24"
  },
  {
    id: "g5_5",
    chapter: 5,
    chapterTitle: "บทที่ 5: เส้นทางสั้นที่สุด (Dijkstra's Algorithm)",
    topic: "shortest_path",
    question: "Dijkstra ใช้โครงสร้างข้อมูลใดในการดึงจุดยอดที่มีระยะทางสั้นที่สุดออกมาอย่างมีประสิทธิภาพ?",
    options: [
      "Priority Queue (Min-Heap)",
      "Simple Queue (FIFO)",
      "Stack (LIFO)",
      "Circular Array"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 22: Dijkstra ใช้ Priority Queue (Min-Heap) เพื่อให้ดึงจุดยอดที่มี dist น้อยที่สุดออกมาได้ในเวลา O(log V)",
    slideRef: "สไลด์หน้า 22"
  },

  // ==================== CHAPTER 6: COMPARISONS & COMPLEXITY ====================
  {
    id: "g6_1",
    chapter: 6,
    chapterTitle: "บทที่ 6: การเปรียบเทียบและความซับซ้อน (Complexity & Summary)",
    topic: "complexity",
    question: "ข้อใดคือความแตกต่างที่สำคัญระหว่าง 'Dijkstra' และ 'Prim's Algorithm' แม้ทั้งคู่จะใช้ Greedy และ Priority Queue เหมือนกัน?",
    options: [
      "Dijkstra เลือกจุดที่มีผลรวมระยะทางจากจุดเริ่มต้น (dist) น้อยสุด ส่วน Prim เลือกเส้นเชื่อม (edge weight) ที่น้อยสุดเชื่อมเข้าสู่ Tree",
      "Dijkstra ใช้กับ Undirected Graph เท่านั้น ส่วน Prim ใช้ได้ทั้ง Directed และ Undirected",
      "Dijkstra มี Time Complexity เป็น O(V²) เสมอ ส่วน Prim เป็น O(V + E)",
      "Dijkstra หา Spanning Tree ส่วน Prim หา Shortest Path"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 25: ทั้งคู่ใช้ PQ + Greedy แต่ Dijkstra สนใจ 'ระยะทางสะสมจากต้นทาง' (dist[u] + w) เพื่อหา Shortest Path ขณะที่ Prim สนใจเพียง 'ค่าน้ำหนักของเส้นเชื่อม' ที่จะต่อกิ่งเข้า MST",
    slideRef: "สไลด์หน้า 25"
  },
  {
    id: "g6_2",
    chapter: 6,
    chapterTitle: "บทที่ 6: การเปรียบเทียบและความซับซ้อน (Complexity & Summary)",
    topic: "complexity",
    question: "อัลกอริทึมใดต่อไปนี้สามารถทำงานกับกราฟที่มี 'ค่าน้ำหนักติดลบ' ได้อย่างถูกต้อง (ตราบใดที่ไม่มี Negative Cycle ใน Undirected Graph)?",
    options: [
      "Prim's Algorithm (สำหรับหา MST)",
      "Dijkstra's Algorithm (สำหรับหา Shortest Path)",
      "ทั้ง Dijkstra และ Prim ทำงานไม่ได้เลย",
      "Dijkstra ทำงานได้ถ้าใช้ Fibonacci Heap"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 25 ตารางเปรียบเทียบ: Prim สามารถใช้กับค่าน้ำหนักลบได้ (✅ ใช้ได้) ในการหา MST แต่ Dijkstra ไม่สามารถใช้กับค่าน้ำหนักลบได้ (❌ ใช้ไม่ได้)",
    slideRef: "สไลด์หน้า 25"
  },
  {
    id: "g6_3",
    chapter: 6,
    chapterTitle: "บทที่ 6: การเปรียบเทียบและความซับซ้อน (Complexity & Summary)",
    topic: "complexity",
    question: "Time Complexity ของ Dijkstra's Algorithm เมื่อใช้ Min-Heap Priority Queue คือข้อใด?",
    options: [
      "O((V + E) log V)",
      "O(V²)",
      "O(V + E)",
      "O(E²)"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 22, 25, 26: Time Complexity ของ Dijkstra (และ Prim) เมื่อใช้ Min-Heap คือ O((V + E) log V)",
    slideRef: "สไลด์หน้า 26"
  },
  {
    id: "g6_4",
    chapter: 6,
    chapterTitle: "บทที่ 6: การเปรียบเทียบและความซับซ้อน (Complexity & Summary)",
    topic: "complexity",
    question: "Time Complexity ของ Kruskal's Algorithm ขั้นตอนที่กินเวลามากที่สุดคือขั้นตอนใด และมีความซับซ้อนเท่าใด?",
    options: [
      "ขั้นตอนการเรียงลำดับเส้นเชื่อม (Sort edges) ใช้เวลา O(E log E)",
      "ขั้นตอนการทำ Union-Find ใช้เวลา O(V²)",
      "ขั้นตอนการอ่านข้อมูลกราฟ ใช้เวลา O(V log V)",
      "ขั้นตอนการคำนวณ visited set ใช้เวลา O(E + V)"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 21, 26: Kruskal ต้องเรียงเส้นเชื่อมตามน้ำหนักก่อน จึงมี Time Complexity เท่ากับ O(E log E)",
    slideRef: "สไลด์หน้า 26"
  },
  {
    id: "g6_5",
    chapter: 6,
    chapterTitle: "บทที่ 6: การเปรียบเทียบและความซับซ้อน (Complexity & Summary)",
    topic: "complexity",
    question: "หากข้อสอบถามว่า 'อัลกอริทึมใดใช้หา Shortest Path บนกราฟที่ไม่มีค่าน้ำหนัก (Unweighted) ได้เร็วที่สุดในเวลา O(V + E)?' คำตอบที่ถูกต้องคืออะไร?",
    options: [
      "BFS (Breadth-First Search)",
      "DFS (Depth-First Search)",
      "Dijkstra's Algorithm",
      "Kruskal's Algorithm"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 12, 16, 26: บนกราฟ Unweighted กราฟไม่มีน้ำหนัก การใช้ BFS เป็นวิธีที่มีประสิทธิภาพที่สุด ใช้เวลาเพียง O(V + E) ไม่จำเป็นต้องเสีย log V ของ Dijkstra!",
    slideRef: "สไลด์หน้า 12, 26"
  },

  // ==================== TRAP BUSTER & HIGH-YIELD QUESTIONS ====================
  {
    id: "trap_1",
    chapter: 5,
    chapterTitle: "บทที่ 5: เส้นทางสั้นที่สุด (Dijkstra's Algorithm)",
    topic: "shortest_path",
    question: "[ข้อสอบลวง] หากมีเส้นเชื่อมตรงจากจุด A ไป B ด้วยน้ำหนัก 7 แต่มีเส้นทาง A → C (น้ำหนัก 3) และ C → B (น้ำหนัก 2) Dijkstra จะเลือกเส้นทางใดเป็นระยะทางสั้นสุด?",
    options: [
      "A → C → B ด้วยระยะทาง 5",
      "A → B ด้วยระยะทาง 7 เพราะเป็นเส้นเชื่อมตรงไม่ต้องแวะ",
      "ขึ้นอยู่กับว่าจุด A หรือ B เข้า Queue ก่อน",
      "เกิด Error เพราะผลรวมไม่เท่ากับเส้นเชื่อมตรง"
    ],
    answer: 0,
    explanation: "Dijkstra ทำการ Relaxation: dist[B] เริ่มต้นจากการไปตรงคือ 7 แต่เมื่อพิจารณาผ่าน C: dist[C] + w(C, B) = 3 + 2 = 5 ซึ่ง 5 < 7 จึงอัปเดต dist[B] = 5 เสมอ!",
    slideRef: "สไลด์หน้า 24"
  },
  {
    id: "trap_2",
    chapter: 4,
    chapterTitle: "บทที่ 4: ต้นไม้แผ่ทั่วน้อยสุด (MST)",
    topic: "mst",
    question: "[ข้อสอบคิดวิเคราะห์] กราฟเชื่อมต่อที่มี 6 จุดยอด (Vertices) จะมีเส้นเชื่อมใน Minimum Spanning Tree ได้มากที่สุดกี่เส้น?",
    options: [
      "5 เส้นเท่านั้น (V - 1)",
      "6 เส้น",
      "15 เส้น (n*(n-1)/2)",
      "ขึ้นอยู่กับผลรวมของน้ำหนัก"
    ],
    answer: 0,
    explanation: "Spanning Tree ของกราฟที่มี 6 จุดยอด ต้องมีเส้นเชื่อมพอดี V - 1 = 6 - 1 = 5 เส้นเสมอ ไม่มากและไม่น้อยไปกว่านี้!",
    slideRef: "สไลด์หน้า 18"
  },
  {
    id: "trap_3",
    chapter: 3,
    chapterTitle: "บทที่ 3: การท่องกราฟ BFS vs DFS",
    topic: "traversal",
    question: "[ข้อสอบวิเคราะห์] การใช้ 'Visited Set' ใน BFS และ DFS มีความสำคัญสูงสุดในเรื่องใด?",
    options: [
      "ป้องกันไม่ให้อัลกอริทึมวนลูปไม่รู้จบ (Infinite Loop) เมื่อกราฟมีวงจร (Cycle)",
      "ช่วยลด Time Complexity ให้เหลือ O(1)",
      "ทำให้สามารถคำนวณค่าน้ำหนักบนเส้นเชื่อมได้แม่นยำขึ้น",
      "เป็นข้อบังคับของภาษา Python เท่านั้น"
    ],
    answer: 0,
    explanation: "หากไม่มี Visited Set เมื่อท่องกราฟที่มี Cycle อัลกอริทึมจะเดินวนกลับไปที่เดิมซ้ำแล้วซ้ำเล่าจนเกิด Infinite Loop หรือ Stack Overflow",
    slideRef: "สไลด์หน้า 12, 14"
  },
  {
    id: "trap_4",
    chapter: 2,
    chapterTitle: "บทที่ 2: การแทนกราฟ",
    topic: "representation",
    question: "[ข้อสอบคำนวณ] กราฟเชื่อมโยงแบบไม่ระบุทิศทางมีจุดยอด 100 จุด หากแทนด้วย Adjacency Matrix จะต้องใช้ช่องตารางทั้งหมดกี่ช่อง?",
    options: [
      "10,000 ช่อง (100 x 100)",
      "100 ช่อง",
      "4,950 ช่อง",
      "200 ช่อง"
    ],
    answer: 0,
    explanation: "Adjacency Matrix มีขนาด V × V เสมอ ดังนั้นหากมีจุดยอด 100 จุด จะมีขนาด 100 × 100 = 10,000 ช่อง!",
    slideRef: "สไลด์หน้า 10"
  },
  {
    id: "trap_5",
    chapter: 6,
    chapterTitle: "บทที่ 6: การเปรียบเทียบและความซับซ้อน",
    topic: "complexity",
    question: "[สรุปจับคู่] อัลกอริทึมใดจับคู่กับแนวคิดการออกแบบ (Algorithm Paradigm) ได้ถูกต้อง?",
    options: [
      "Dijkstra, Prim, Kruskal เป็น Greedy Algorithm ทั้งหมด",
      "BFS เป็น Dynamic Programming",
      "DFS เป็น Divide and Conquer",
      "Kruskal เป็น Backtracking"
    ],
    answer: 0,
    explanation: "ตามสไลด์หน้า 20, 21, 22, 25: Dijkstra, Prim และ Kruskal ล้วนใช้หลักการโลภ (Greedy Approach) คือเลือกทางเลือกที่ดูดีที่สุดในแต่ละก้าวเสมอ",
    slideRef: "สไลด์หน้า 20, 21, 22, 25"
  }
];

// Interactive Trace Practice Scenarios
const TRACE_SCENARIOS = {
  bfs: {
    title: "BFS Level-by-Level Interactive Tracer",
    description: "จำลองขั้นตอนการท่องแบบกว้างจากสไลด์หน้า 13: ดูการเข้า-ออก Queue ทีละก้าว",
    nodes: [
      { id: 0, label: "0", x: 200, y: 50 },
      { id: 1, label: "1", x: 100, y: 150 },
      { id: 2, label: "2", x: 300, y: 150 },
      { id: 3, label: "3", x: 50, y: 270 },
      { id: 4, label: "4", x: 150, y: 270 },
      { id: 5, label: "5", x: 300, y: 270 }
    ],
    edges: [
      { u: 0, v: 1 },
      { u: 0, v: 2 },
      { u: 1, v: 3 },
      { u: 1, v: 4 },
      { u: 2, v: 5 },
      { u: 4, v: 5 }
    ],
    steps: [
      { step: 0, action: "เริ่มต้น", current: 0, queue: [0], visited: [0], text: "ใส่จุดเริ่มต้น 0 ลงใน Queue, visited = {0}" },
      { step: 1, action: "Dequeue 0", current: 0, queue: [1, 2], visited: [0, 1, 2], text: "ดึง 0 ออกมา สำรวจเพื่อนบ้าน 1 และ 2 -> ใส่ลง Queue" },
      { step: 2, action: "Dequeue 1", current: 1, queue: [2, 3, 4], visited: [0, 1, 2, 3, 4], text: "ดึง 1 ออกมา สำรวจเพื่อนบ้าน 3 และ 4 -> ใส่ลง Queue" },
      { step: 3, action: "Dequeue 2", current: 2, queue: [3, 4, 5], visited: [0, 1, 2, 3, 4, 5], text: "ดึง 2 ออกมา สำรวจเพื่อนบ้าน 5 -> ใส่ลง Queue" },
      { step: 4, action: "Dequeue 3", current: 3, queue: [4, 5], visited: [0, 1, 2, 3, 4, 5], text: "ดึง 3 ออกมา เพื่อนบ้าน (1) visited แล้ว -> ไม่มีใหม่" },
      { step: 5, action: "Dequeue 4", current: 4, queue: [5], visited: [0, 1, 2, 3, 4, 5], text: "ดึง 4 ออกมา เพื่อนบ้าน (1, 5) visited แล้ว -> ไม่มีใหม่" },
      { step: 6, action: "Dequeue 5", current: 5, queue: [], visited: [0, 1, 2, 3, 4, 5], text: "ดึง 5 ออกมา เพื่อนบ้าน visited แล้ว -> Queue ว่าง จบการท่อง!" }
    ],
    expectedOrder: "0 → 1 → 2 → 3 → 4 → 5"
  },

  dfs: {
    title: "DFS Depth-First Tracer",
    description: "จำลองการดำดิ่งลึกสุดใจก่อน Backtrack จากสไลด์หน้า 15",
    nodes: [
      { id: 0, label: "0", x: 200, y: 50 },
      { id: 1, label: "1", x: 100, y: 150 },
      { id: 2, label: "2", x: 300, y: 150 },
      { id: 3, label: "3", x: 50, y: 270 },
      { id: 4, label: "4", x: 150, y: 270 },
      { id: 5, label: "5", x: 300, y: 270 }
    ],
    edges: [
      { u: 0, v: 1 },
      { u: 0, v: 2 },
      { u: 1, v: 3 },
      { u: 1, v: 4 },
      { u: 2, v: 5 },
      { u: 4, v: 5 }
    ],
    steps: [
      { step: 0, action: "dfs(0)", current: 0, stack: [0], visited: [0], text: "เริ่ม dfs(0) ทำเครื่องหมาย visited: {0}" },
      { step: 1, action: "dfs(1)", current: 1, stack: [0, 1], visited: [0, 1], text: "จาก 0 เลือกเพื่อนบ้านแรกคือ 1 -> dfs(1)" },
      { step: 2, action: "dfs(3)", current: 3, stack: [0, 1, 3], visited: [0, 1, 3], text: "จาก 1 เลือกเพื่อนบ้านแรกคือ 3 -> dfs(3)" },
      { step: 3, action: "Backtrack to 1", current: 1, stack: [0, 1], visited: [0, 1, 3], text: "จุด 3 สุดทางแล้ว -> Backtrack กลับมาที่ 1" },
      { step: 4, action: "dfs(4)", current: 4, stack: [0, 1, 4], visited: [0, 1, 3, 4], text: "จาก 1 เลือกเพื่อนบ้านถัดไปคือ 4 -> dfs(4)" },
      { step: 5, action: "dfs(5)", current: 5, stack: [0, 1, 4, 5], visited: [0, 1, 3, 4, 5], text: "จาก 4 ไปยัง 5 -> dfs(5)" },
      { step: 6, action: "dfs(2)", current: 2, stack: [0, 1, 4, 5, 2], visited: [0, 1, 2, 3, 4, 5], text: "จาก 5 ไปยัง 2 -> dfs(2) ครบทุกจุดยอด จบ!" }
    ],
    expectedOrder: "0 → 1 → 3 → 4 → 5 → 2"
  },

  dijkstra: {
    title: "Dijkstra Single-Source Shortest Path Tracer",
    description: "จำลองขั้นตอน Relaxation หาทางสั้นสุดจาก A ตามสไลด์หน้า 24",
    nodes: [
      { id: "A", label: "A", x: 70, y: 150 },
      { id: "B", label: "B", x: 230, y: 70 },
      { id: "C", label: "C", x: 210, y: 230 },
      { id: "D", label: "D", x: 370, y: 70 },
      { id: "E", label: "E", x: 390, y: 230 }
    ],
    edges: [
      { u: "A", v: "B", w: 4 },
      { u: "A", v: "C", w: 2 },
      { u: "C", v: "B", w: 1 },
      { u: "B", v: "D", w: 5 },
      { u: "C", v: "D", w: 8 },
      { u: "C", v: "E", w: 10 },
      { u: "D", v: "E", w: 2 }
    ],
    steps: [
      {
        step: 0,
        pick: "-",
        dist: { A: 0, B: "∞", C: "∞", D: "∞", E: "∞" },
        text: "เริ่มต้น: dist[A]=0, จุดอื่น=∞. ใส่ (0, A) ลง Priority Queue"
      },
      {
        step: 1,
        pick: "A (dist: 0)",
        dist: { A: 0, B: 4, C: 2, D: "∞", E: "∞" },
        text: "ดึง A ออกมา Relax เพื่อนบ้าน: B (0+4=4), C (0+2=2). อัปเดตตาราง!"
      },
      {
        step: 2,
        pick: "C (dist: 2)",
        dist: { A: 0, B: 3, C: 2, D: 10, E: 12 },
        text: "ดึง C (dist 2 น้อยสุด) ออกมา Relax: B (2+1=3 < 4 ✨ปรับ B เป็น 3!), D (2+8=10), E (2+10=12)"
      },
      {
        step: 3,
        pick: "B (dist: 3)",
        dist: { A: 0, B: 3, C: 2, D: 8, E: 12 },
        text: "ดึง B (dist 3) ออกมา Relax: D (3+5=8 < 10 ✨ปรับ D เป็น 8!)"
      },
      {
        step: 4,
        pick: "D (dist: 8)",
        dist: { A: 0, B: 3, C: 2, D: 8, E: 10 },
        text: "ดึง D (dist 8) ออกมา Relax: E (8+2=10 < 12 ✨ปรับ E เป็น 10!)"
      },
      {
        step: 5,
        pick: "E (dist: 10)",
        dist: { A: 0, B: 3, C: 2, D: 8, E: 10 },
        text: "ดึง E (dist 10) สำรวจครบแล้ว PQ ว่าง -> จบการทำงาน!"
      }
    ],
    finalPaths: [
      { target: "A → B", dist: 3, path: "A → C → B" },
      { target: "A → C", dist: 2, path: "A → C" },
      { target: "A → D", dist: 8, path: "A → C → B → D" },
      { target: "A → E", dist: 10, path: "A → C → B → D → E" }
    ]
  },

  prim: {
    title: "Prim's MST Growth Tracer",
    description: "การขยายต้นไม้แผ่ทั่วทีละกิ่งตามสไลด์หน้า 20",
    nodes: [
      { id: "A", label: "A", x: 70, y: 150 },
      { id: "B", label: "B", x: 230, y: 70 },
      { id: "C", label: "C", x: 210, y: 230 },
      { id: "D", label: "D", x: 370, y: 70 },
      { id: "E", label: "E", x: 390, y: 230 }
    ],
    edges: [
      { u: "A", v: "B", w: 4 },
      { u: "A", v: "C", w: 2 },
      { u: "B", v: "C", w: 1 },
      { u: "B", v: "D", w: 5 },
      { u: "C", v: "D", w: 8 },
      { u: "C", v: "E", w: 10 },
      { u: "D", v: "E", w: 2 }
    ],
    steps: [
      { step: 1, action: "เพิ่ม A", edge: "A-C (2)", mstEdges: ["A-C"], weight: 2, text: "เริ่มที่ A: ดูเส้นเชื่อม A-B(4), A-C(2) -> เลือก A-C(2) ✅" },
      { step: 2, action: "เพิ่ม C", edge: "C-B (1)", mstEdges: ["A-C", "B-C"], weight: 3, text: "จาก {A, C}: เส้นเชื่อมนอกคือ C-B(1), A-B(4), C-D(8), C-E(10) -> เลือก C-B(1) ✅" },
      { step: 3, action: "เพิ่ม B", edge: "B-D (5)", mstEdges: ["A-C", "B-C", "B-D"], weight: 8, text: "จาก {A, B, C}: เส้นเชื่อมนอกคือ B-D(5), C-D(8), C-E(10) -> เลือก B-D(5) ✅" },
      { step: 4, action: "เพิ่ม D", edge: "D-E (2)", mstEdges: ["A-C", "B-C", "B-D", "D-E"], weight: 10, text: "จาก {A, B, C, D}: เส้นเชื่อมไป E คือ D-E(2), C-E(10) -> เลือก D-E(2) ✅" }
    ],
    totalWeight: 10
  },

  kruskal: {
    title: "Kruskal's Edge Sorting & Cycle Check Tracer",
    description: "การเรียงเส้นเชื่อมแล้วเลือกทีละเส้นด้วย Union-Find ตามสไลด์หน้า 21",
    sortedEdges: [
      { u: "B", v: "C", w: 1, status: "เลือก ✅", reason: "เชื่อม {B} กับ {C} ไม่เกิด Cycle" },
      { u: "A", v: "C", w: 2, status: "เลือก ✅", reason: "เชื่อม {A} กับ {B, C} ไม่เกิด Cycle" },
      { u: "D", v: "E", w: 2, status: "เลือก ✅", reason: "เชื่อม {D} กับ {E} ไม่เกิด Cycle" },
      { u: "A", v: "B", w: 4, status: "ข้าม ❌ (เกิด Cycle!)", reason: "find(A) == find(B) อยู่ในกลุ่มเดียวกันแล้ว ข้าม!" },
      { u: "B", v: "D", w: 5, status: "เลือก ✅", reason: "เชื่อมกลุ่ม {A, B, C} กับกลุ่ม {D, E} ไม่เกิด Cycle" },
      { u: "C", v: "D", w: 8, status: "จบครบ V-1 เส้นแล้ว", reason: "ได้ 4 เส้นเชื่อมครบแล้ว ไม่ต้องพิจารณาต่อ" },
      { u: "C", v: "E", w: 10, status: "จบครบ V-1 เส้นแล้ว", reason: "ได้ 4 เส้นเชื่อมครบแล้ว ไม่ต้องพิจารณาต่อ" }
    ],
    totalWeight: "1 + 2 + 2 + 5 = 10"
  }
};
