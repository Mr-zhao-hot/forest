from multiprocessing import Value, Lock
import ctypes

shared_num = Value(ctypes.c_int, 0)
lock = Lock()

