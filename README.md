# OOP-IBU-EXAM Simulator 🚀

A modern, premium, and interactive browser-based simulator for Java OOP exams at International Burch University (IBU). 

This portal is designed to help first-year IT college students practice Object-Oriented Programming (OOP) concepts, featuring automatic local compilation, unit testing, and instant feedback.

---

## 🌟 Key Features

1. **Dual Practice Modes:**
   - **Exam Type: Last Year:** Sesi ujian featuring one of 10 randomized question packets. Each packet contains 8 challenging OOP questions covering software design patterns (Singleton, Builder, Factory, Generics, downcasting, JDBC).
   - **Exam Type: Becir:** Test advanced data processing skills. Contains 7 detailed CSV processing questions integrating Custom Annotations, Custom Exceptions, Fluent Builders, and Factories.
2. **Hidden Unit Test Harness:**
   - Write only the requested classes/methods. A hidden assertion runner validates signatures, logic, inheritance, and error handling.
3. **Interactive Workspace:**
   - Dracula-themed code editor (CodeMirror), live scoring metrics, console stdout outputs, and dynamic grade feedback comments.
4. **Offline JVM Compiler Sandbox:**
   - Transpiles standard Java code into JavaScript at runtime and executes it in a sandbox.
   - Mock versions of standard Java collections (`HashMap`, `ArrayList`, `Optional`), IO classes (`BufferedReader`, `FileReader`), Database JDBC interfaces (`DriverManager`, `Connection`), and common Exceptions (`NullPointerException`, `ClassCastException`, `NumberFormatException`).

---

## 🛠️ Step-by-Step Installation Guide (From Scratch)

This guide is written for **first-year IT college students**. Follow the steps below for your operating system to set up and run the simulator locally.

### 📋 Prerequisites

Before running the simulator, you need to install **Node.js** (which includes `npm`, the package manager).

1. Go to [nodejs.org](https://nodejs.org/).
2. Download the **LTS (Long Term Support)** version for your OS.
3. Open the downloaded file and follow the standard installation prompts (click "Next" until finished).

---

### 💻 Windows Installation

1. **Open PowerShell or Command Prompt:**
   - Press the `Windows Logo Key` on your keyboard, type `PowerShell`, and press `Enter`.
2. **Download or Clone the Project:**
   - If you have Git installed, run:
     ```powershell
     git clone https://github.com/your-username/OOP-IBU-EXAM-Simulator.git
     cd OOP-IBU-EXAM-Simulator
     ```
   - *Alternative (No Git):* Click the green **Code** button on GitHub, select **Download ZIP**, extract the files, and open PowerShell inside the extracted folder.
3. **Install Dependencies:**
   - Run the following command to install the development server (Vite):
     ```powershell
     npm install
     ```
4. **Start the Simulator:**
   - Spin up the local web server:
     ```powershell
     npm run dev
     ```
5. **Access the App:**
   - Open your web browser and navigate to the address shown in your PowerShell console (usually `http://localhost:5173`).

---

### 🍎 macOS Installation

1. **Open Terminal:**
   - Press `Cmd + Space` to open Spotlight search, type `Terminal`, and press `Enter`.
2. **Download or Clone the Project:**
   - If you have Git installed, run:
     ```bash
     git clone https://github.com/your-username/OOP-IBU-EXAM-Simulator.git
     cd OOP-IBU-EXAM-Simulator
     ```
   - *Alternative (No Git):* Download the ZIP from GitHub, extract it, and navigate into the folder using Terminal:
     ```bash
     cd ~/Downloads/OOP-IBU-EXAM-Simulator
     ```
3. **Install Dependencies:**
   - Install the project packages:
     ```bash
     npm install
     ```
4. **Start the Simulator:**
   - Launch the local server:
     ```bash
     npm run dev
     ```
5. **Access the App:**
   - Click on the link printed in Terminal (usually `http://localhost:5173`) to open it in your browser.

---

### 🐧 Linux Installation

1. **Open your Terminal application.**
2. **Install Node.js & npm (if not already installed):**
   - On Debian/Ubuntu-based distributions, run:
     ```bash
     sudo apt update
     sudo apt install nodejs npm
     ```
3. **Download or Clone the Project:**
   - Clone the repository:
     ```bash
     git clone https://github.com/your-username/OOP-IBU-EXAM-Simulator.git
     cd OOP-IBU-EXAM-Simulator
     ```
4. **Install Dependencies:**
   - Run:
     ```bash
     npm install
     ```
5. **Start the Simulator:**
   - Run:
     ```bash
     npm run dev
     ```
6. **Access the App:**
   - Open your browser and navigate to `http://localhost:5173`.

---

## 📖 How to Use the Simulator

1. **Select Mode:** Choose **Last Year** (random packet of 8 questions) or **Becir** (7 CSV processing questions) on the home screen.
2. **Read Description:** View the challenge requirements on the left pane.
3. **Code:** Write your Java solution directly in the central IDE workspace.
4. **Run Tests:** Click **Run Tests (Test Code)** on the top right to verify your code correctness.
5. **Check Output:** Inspect the compile errors, exception traces, and console `System.out.println` output in the bottom drawer.
6. **Submit:** Click **Submit Exam** when finished to see your question-by-question grade review and code overview.

Happy Coding! 🎓 Double check your constructor chaining, singleton instantiation, and custom annotations, and ace your OOP exams!
