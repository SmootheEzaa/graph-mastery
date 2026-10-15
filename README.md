# 🎮 Graph Mastery: The Algorithm Exam Arena
### เกมจำลองฝึกทำข้อสอบวิชาโครงสร้างข้อมูลและอัลกอริทึมกราฟ (Graph Algorithms)

> สร้างขึ้นโดยวิเคราะห์เนื้อหาทั้งหมดจากสไลด์การสอน **"Graph Algorithms Presentation"** (27 สไลด์) ควบคุมโดย อ.พิเศษพงศ์ สุธาพันธ์

[![Live Demo](https://img.shields.io/badge/Play_Online-GitHub_Pages-brightgreen?style=for-the-badge&logo=github)](https://smootheezaa.github.io/graph-mastery/)
**🔗 เข้าเล่นเกมออนไลน์ได้ทันที:** [https://smootheezaa.github.io/graph-mastery/](https://smootheezaa.github.io/graph-mastery/)

---

## 🌟 ฟีเจอร์เด่นภายในเกม

1. **🏰 โหมดดันเจี้ยนตะลุยด่าน (Campaign Stages)**
   - แบ่งเป็น 6 ด่านตามเนื้อหาในบทเรียน:
     - **ด่าน 1:** พื้นฐานและประเภทของกราฟ ($G=(V, E)$, Directed, Undirected, Weighted, Cyclic, DAG)
     - **ด่าน 2:** การแทนกราฟ Matrix vs List (Dense vs Sparse, $O(V^2)$ vs $O(V+E)$, การเข้าถึง $O(1)$)
     - **ด่าน 3:** ศึกท่องกราฟ BFS vs DFS (Queue FIFO vs Stack LIFO, Level-order, Backtracking, Memory)
     - **ด่าน 4:** อาณาจักรต้นไม้ MST (V - 1 เส้นเชื่อม, Prim's vs Kruskal's, Union-Find ตรวจจับ Cycle)
     - **ด่าน 5:** มนตราเส้นทางสั้นสุด Dijkstra (Single-Source Shortest Path, Relaxation, กับดักน้ำหนักลบ)
     - **ด่าน 6:** Grand Boss Exam Arena (รวมมิตรข้อสอบสุ่ม 10 ข้อ ท้าทายความจำและความเข้าใจ)
   - มีระบบหัวใจ 3 ดวง ❤️, หลอด XP, ระบบ Streak ต่อเนื่อง 🔥, และเลเวลตัวละครตั้งแต่ *Novice Traverser* ไปจนถึง *Graph Grandmaster*

2. **⏱️ ห้องสอบจำลองเสมือนจริง (Mock Exam Simulator)**
   - สุ่มโจทย์คละบท 10, 15 หรือ 20 ข้อ
   - จับเวลานับถอยหลังเสมือนการสอบมิดเทอม/ไฟนอลจริง
   - กระดานนำทาง Palette: สามารถตรวจสถานะข้อที่ตอบแล้ว และปักหมุดข้อที่ลังเล (Flag 🚩) เพื่อกลับมาทบทวนได้
   - ระบบตัดเกรด A+ ถึง F ทันทีหลังส่งข้อสอบ พร้อมตารางวิเคราะห์จุดแข็ง-จุดอ่อนแยกตาม 6 หัวข้อย่อย
   - เฉลยละเอียดพร้อมระบุเลขหน้าสไลด์อ้างอิงทุกข้อ

3. **🕹️ ห้องทดลองและจำลองภาพอัลกอริทึม (Interactive Lab & Tracer)**
   - **BFS Level Tracer:** แสดงการเข้า-ออก Queue (FIFO) และ Visited Set ทีละก้าวตามตัวอย่างสไลด์หน้า 13
   - **DFS Depth Tracer:** แสดง Call Stack (LIFO) และการ Backtrack ตามตัวอย่างสไลด์หน้า 15
   - **Dijkstra Shortest Path:** แสดงตาราง `dist[]` และการคำนวณ Relaxation แบบเรียลไทม์ตามสไลด์หน้า 24
   - **Prim's MST:** แสดงการขยายกิ่งต้นไม้ทีละเส้นเชื่อมตามสไลด์หน้า 20
   - **Kruskal's MST:** แสดงการคัดเลือก Edge เรียงตามน้ำหนักและการ Reject เส้นเชื่อมที่ทำให้เกิด Cycle ด้วย Union-Find ตามสไลด์หน้า 21

4. **📖 สรุปย่อหัวใจสำคัญก่อนสอบ (Cheat Sheet)**
   - ตารางสรุป Time & Space Complexity ของอัลกอริทึมทั้ง 5 ตัว (BFS, DFS, Dijkstra, Prim, Kruskal)
   - ตารางเปรียบเทียบ Matrix vs List, BFS vs DFS, Dijkstra vs Prim
   - 4 จุดกับดักที่ข้อสอบชอบหลอกมากที่สุด

5. **🔊 ระบบเสียงประกอบ Synthesized Sound FX**
   - สร้างเสียงด้วย Web Audio API แบบ Pure JavaScript ไม่มีไฟล์ภายนอก โหลดเร็ว เล่นออฟไลน์ได้ 100%

---

## 🚀 วิธีเข้าเล่นเกม

### วิธีที่ 1: เล่นออนไลน์ผ่านเว็บ (สะดวกที่สุด ไม่ต้องติดตั้ง)
- คลิกเปิดลิงก์: **[https://smootheezaa.github.io/graph-mastery/](https://smootheezaa.github.io/graph-mastery/)**

### วิธีที่ 2: เปิดผ่านเบราว์เซอร์โดยตรง
- ดับเบิลคลิกเปิดไฟล์ `index.html` บน Google Chrome, Microsoft Edge หรือเบราว์เซอร์ใดก็ได้

### วิธีที่ 3: รันผ่าน Local Server
- เปิด Terminal แล้วรันคำสั่ง:
  ```bash
  python -m http.server 8080
  ```
- จากนั้นเปิดเบราว์เซอร์ไปที่: **http://localhost:8080/**
