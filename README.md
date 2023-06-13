# Object Detection Demo

This is a simple object detection application that performs real-time object
detection using TensorFlow.js and the COCO-SSD model. It allows you to collect
images of specific objects from your webcam and store them for later use.

## Prerequisites

Before running the demo, make sure you have the following
prerequisites installed:

- Node.js: [https://nodejs.org/](Download and install Node.js for your platform).

## Setup

1. Clone this repository:

```bash
    Copy code git clone <repository-url>
```

2. Navigate to the project directory:

```bash
Copy code cd object-detection-demo
```

3. Install the dependencies:

```bash
 npm install
```

## Usage

To start the object detection demo, run the following command:

```bash
http-server
```

This will launch the application and open it in your
default web browser. You can then use the webcam to perform real-time object
detection and collect images of specific objects.

### Selecting Objects to Collect

You can select the type of objects you want to
collect by choosing from the dropdown menu on the main page. The available
options will be populated based on the COCO-SSD model's predefined object
classes.

### Storing Collected Images

When you click the "Start Collecting Images" button,
the application will start detecting objects in the video stream. If an object
of the selected type is detected, an image will be captured and stored in the
IndexedDB database.

### Viewing Stored Images

You can view the stored images by clicking the "Show
Stored Images" button. This will open a modal that displays the collected
images. You can navigate through the images using the pagination controls.

## Contributing

Contributions are welcome! If you find any issues or have
suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
