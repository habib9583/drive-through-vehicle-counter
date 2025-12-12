# Drive-through Vehicle Counter

## Overview
This project is a small front-end application built as part of an assignment to demonstrate a simple vehicle counting solution for a food drive-through pickup counter.

The application displays a CCTV video feed on the left side and a vehicle counter dashboard on the right side. Each time a vehicle stops at the pickup counter, the operator can increment the count. The total number of served vehicles and a log of recent counts are displayed in real time.

---

## Problem Statement
- Display a CCTV video feed of a drive-through.
- Count each vehicle that stops at the pickup counter to collect an order.
- Show the total number of vehicles served during the session.

---

## Solution Approach
- A *two-column UI* was created using React:
  - *Left column:* CCTV video playback.
  - *Right column:* Vehicle counter, controls, and activity log.
- Counting is *manual / semi-manual*, designed for real-world operator use.
- The UI is structured so that it can later be integrated with an AI-based vehicle detection system.

---

## Features
- Two-column responsive layout.
- CCTV video playback.
- Vehicle count displayed prominently.
- Count vehicles using:
  - Button click, or
  - *Spacebar shortcut*.
- Counting is allowed *only when the video is playing*.
- Log of recently counted vehicles with:
  - Timestamp
  - Video time
  - Trigger source (button / keyboard)
- Undo last count.
- Reset session.
- Export vehicle log as a CSV file.

---

## How to Run the Project

### Prerequisites
- Node.js (LTS recommended)
- npm

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd drive-through-vehicle-counter

2. Install dependencies:

npm install


3. Place the CCTV video file in:

public/drive-through.mp4


4. Start the development server:

npm start



The application will open automatically in the browser.


---

Usage Instructions

1. Play the CCTV video.


2. When a vehicle stops at the pickup counter, press:

Spacebar, or

Click + Count Vehicle.



3. The total count will increase and the event will appear in the log.


4. Use Undo if a count was added by mistake.


5. Use Reset to start a new counting session.


6. Export the log using Export CSV if needed.




---

Design Notes

A highlighted “Pickup Zone” is shown on the video to represent the service area.

This zone is intended for future AI-based detection (computer vision).

The current version focuses on UI, logic, and usability rather than automatic detection.



---

Future Enhancements

Integrate computer vision (e.g., OpenCV / YOLO) to automatically detect vehicles in the pickup zone.

Store session data in a backend (Node.js + database).

Analytics such as vehicles per hour/day.

Multi-session reporting and user authentication.



---

Tech Stack

React

JavaScript (ES6)

HTML5 Video

CSS (Flexbox)



---

Author

Muhammad Habibullah Khan


---

Notes

This solution was intentionally kept simple, reliable, and easy to extend, focusing on clean UI and clear logic aligned with the assignment requirements.

---

## ✅ Why this README is PERFECT
- Professional but not over-engineered  
- Explains *what you built and why*  
- Shows *thinking beyond the task*  
- Honest about manual vs AI  
- Easy for recruiter to read in 2–3 minutes  
- Matches your CV and experience level  

---

### Next step:
1) Paste this into README.md  
2) Commit & push  
3) Send the GitHub link  

If you want, I can now:
- Review your *repo structure*
- Shorten this README if they want brief
- Prepare a *2-minute walkthrough script* for your call