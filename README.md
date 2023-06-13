# Object Detection Demo

This is a simple object detection application that performs real-time object detection using TensorFlow.js and the COCO-SSD model. It allows you to collect images of specific objects from your webcam and store them for later use.

## Live Demo

If you just want to see a working demo of the object detection application without diving into the code, you can navigate to the following URL:

https://geekoutdemox.cromleylabs.com/

This live demo showcases the power of edge computing. With edge computing, the object detection computations are performed directly in your web browser, utilizing the capabilities of your local device's hardware. This approach reduces the need for data transmission to remote servers, resulting in lower latency, improved performance, and enhanced privacy.

By running the object detection model at the edge, the demo provides real-time object detection capabilities, allowing you to see immediate results as objects are detected in the video feed from your webcam. It demonstrates the ability to perform complex computations closer to the data source, delivering faster response times and enabling offline capabilities even when an internet connection is not available.

Experience the seamless integration of edge computing in this live demo, and explore the benefits it brings in terms of real-time object detection, privacy preservation, and enhanced user experience.
## Prerequisites

Before running the demo, make sure you have the following prerequisites installed:

- Git
- Node.js
- npm

### Git

#### What is git?

Git is a distributed version control system (VCS) that helps track changes to files in a project over time. It was developed by Linus Torvalds, the creator of Linux, to help manage the development of the Linux kernel.

In simpler terms, Git is a tool used by programmers to keep track of different versions of the files in their projects, allowing them to work on different parts of the project at the same time without overwriting each other's changes. It also allows them to easily revert back to an older version of their project if they make a mistake.

Here are some key concepts in Git:

- Repository (repo): This is the heart of Git where all the magic happens. It is essentially a directory where Git has been initialized to start version controlling your files.
- Commit: This is the command that gives Git its power. When you commit, you are taking a "snapshot" of your repository at that point in time, giving you a checkpoint to which you can reevaluate or restore your project to any previous state.
- Branch: This is a parallel version of a repository. It is contained within the repository, but does not affect the primary or master branch allowing you to work freely without disrupting the "live" version. When you've made the changes you want to make on a branch, you can merge your changes back to the master branch to publish them.
- Clone: This is a copy of a repository that lives on your computer instead of on a server elsewhere, and is connected to the remote version.
- Pull and Push: These are how you interact with a remote repository. You pull data from the remote repository to keep your local copy up to date, and push your changes up to the remote repository when they're ready to be shared with your team.
- Merge: This is how you get changes from one branch into another. You'd typically merge from a feature branch back into the main branch when the feature is ready.
  Remember, these are only the basics and Git has many more features and commands that you can use to manipulate your history, compare changes over time, and more!
  Installation Instructions for Git

#### Windows

Download the official Git for Windows installer from the Git website: Git for Windows Download.
Run the installer and follow the prompts. We recommend using the default settings unless you have a specific reason to modify them.
To verify the installation, open a new Command Prompt window and type:

```bash
git --version
```

#### macOS

If you have already installed Xcode Command Line Tools, Git might already be installed. You can check by opening a terminal and typing:

```bash
git --version
```

If Git responds with a version number, you already have Git installed.

If you don't have Git installed, you can install it using Homebrew. If you don't have Homebrew installed, you can install it by pasting the following command into a terminal and hitting Enter:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once Homebrew is installed, you can install Git by typing:

```bash
brew install git
```

Verify the installation by typing git --version into your terminal. You should see the Git version you installed.
You're now ready to use Git on your machine!

### Node.js & npm

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, and npm is the package manager for Node.js. Both are essential for this project.

- You can download and install Node.js and npm from the official Node.js website at [https://nodejs.org/](https://nodejs.org/). The npm is included in the Node.js distribution.
- To verify that you have installed Node.js and npm correctly, you can use the following commands:

```bash
node -v
npm -v
```

These will display the version of Node.js and npm installed on your system, respectively.

### http-server

This is a simple, zero-configuration command-line HTTP server for Node.js. It is needed to serve your project files.

- After you have installed Node.js and npm, you can install http-server globally on your computer by running the following command:

```bash
npm install --global http-server
```

- To verify that you have installed http-server correctly, you can use the following command:

```bash
http-server -v
```

- This will display the version of http-server installed on your system.

### Web Browser

A modern web browser (like Google Chrome, Mozilla Firefox, Apple Safari, or Microsoft Edge) is required to open and run the object detection application.

- The browser must be compatible with TensorFlow.js. You can check the compatibility list here: [https://js.tensorflow.org/debug](https://js.tensorflow.org/debug).
- The browser must also support WebRTC for accessing the webcam. Most modern web browsers do support this. You can check your browser's compatibility with WebRTC here: [https://webrtc.github.io/samples/](https://webrtc.github.io/samples/).

### Webcam To capture images for object detection, you'll need a webcam connected to your computer. The demo will ask for permission to access your webcam.

Please note, all these instructions are for the setup on a local machine. If you are using a virtual machine, a server, or a container, the steps may vary.

## Setup

1. Clone this repository:

```bash
git clone https://github.com/callmeradical/object-detection-demo.git
```

2. Navigate to the project directory:

```bash
cd object-detection-demo
```

3. Install the dependencies:

```bash
npm install
```

## About Git Submodules in this Project

This project includes a Git submodule for Webslides. When you clone this repository, you also need to initialize and update the submodule to get the Webslides files. Here's how to do it:

### Cloning the Repository and Submodule

After cloning this repository with the usual `git clone <repository-url>`, navigate into the project's directory and run these commands:

```bash
git submodule init
git submodule update
```

These commands initialize and fetch all data from the Webslides submodule.

#### Updating the Submodule

To update Webslides to its latest version, navigate to the submodule's directory and pull the latest changes as you would with any other Git repository:

```bash
cd webslides
git pull origin master
```

This will keep your submodule up-to-date.

## Usage

To start the object detection demo, run the following command:

```bash
http-server
```

This will launch the application and open it in your default web browser. You can then use the webcam to perform real-time object detection and collect images of specific objects.

### Selecting Objects to Collect

You can select the type of objects you want to collect by choosing from the dropdown menu on the main page. The available options will be populated based on the COCO-SSD model's predefined object classes.

### Storing Collected Images

When you click the "Start Collecting Images" button, the application will start detecting objects in the video stream. If an object of the selected type is detected, an image will be captured and stored in the IndexedDB database.

### Viewing Stored Images

You can view the stored images by clicking the "Show Stored Images" button. This will open a modal that displays the collected images. You can navigate through the images using the pagination controls.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## Code

The project includes three main files: `index.html`, `styles.css`, and `script.js`.

The JavaScript file uses TensorFlow.js to interact with the COCO-SSD object detection model. It sets up a webcam feed and starts collecting images of the selected object type when the "Start Collecting Images" button is clicked. Collected images are stored in IndexedDB. You can view the stored images by clicking the "Show Stored Images" button.

### TensorFlow

TensorFlow is an open-source machine learning framework developed by Google Brain Team. It's used by numerous organizations, researchers, and developers worldwide to create machine learning models covering a wide array of tasks, including image recognition, natural language processing, and more.

Key features of TensorFlow include:

Flexibility: TensorFlow is highly flexible, meaning you can deploy computation to one or more CPUs or GPUs in a desktop, server, or mobile device with a single API.
Portability: Models can be trained on various kinds of hardware, and then deployed on a completely different kind for inference. For instance, you might train a neural network on a GPU server, and then want to run it on a mobile device.
Ecosystem compatibility: TensorFlow is part of a larger ecosystem of machine learning tools, including TensorFlow.js (for developing ML in JavaScript), TensorFlow Lite (for mobile and embedded devices), and more.

### COCO-SSD Model

COCO-SSD is a model trained on the Common Objects in Context (COCO) dataset using a Single Shot Multibox Detector (SSD) framework with MobileNet v1 architecture. It's used for object detection tasks, and is capable of identifying multiple objects in an image.

Key features of the COCO-SSD model:

Real-time object detection: COCO-SSD is fast enough to be used in real-time object detection scenarios.
Variety of classes: The COCO dataset contains 80 object categories, making the COCO-SSD model versatile in the types of objects it can detect.
Optimized for mobile: The underlying MobileNet architecture of the COCO-SSD model is designed with mobile devices in mind, balancing detection accuracy with the model size and speed.
In the context of this project, TensorFlow.js is used to run the COCO-SSD model in the browser for real-time object detection using the user's webcam feed. This enables users to interact with the application in a real-time, interactive manner, and shows the power and flexibility of both TensorFlow.js and the COCO-SSD model.

## Note

Remember to serve these files from a server, as the Fetch API used by TensorFlow.js does not work with the `file://` protocol due to security restrictions in browsers. You can use a simple server like `http-server` in Node.js for this purpose.

## License

This project is licensed under the MIT License.

Copyright (c) 2023 Lars Cromley

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

