import sys
import cv2
import numpy as np
import skvideo.io
import skvideo.measure

def get_frames(filename):
    return skvideo.io.vread(filename)

def get_scenes(frames):
    print(frames.shape)
    #cv2.imshow("", frames[1,:,:,:])
    #cv2.waitKey(0)
    print("Loaded video.")
    scenes = skvideo.measure.scenedet(frames, method='intensity', parameter1=35, min_scene_length=140)
    #print(scenes)
    print("Transition scenes:")
    for i in scenes:
        print("Frame:", i, "Time:", i/24.0)
    return scenes
