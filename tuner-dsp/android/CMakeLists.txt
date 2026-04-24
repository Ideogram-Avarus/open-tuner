cmake_minimum_required(VERSION 3.4.1)

project(tuner)

set(CMAKE_CXX_STANDARD 20)

file(GLOB_RECURSE SOURCES CONFIGURE_DEPENDS 
    "../shared/*.cpp"
)


add_library(
    tuner
    SHARED
    ${SOURCES}
)
    
target_include_directories(
    tuner
    PUBLIC
    ../shared
)

# Compatibility for 16k devices
target_link_options(
    tuner
    PRIVATE
    "-Wl,-z,max-page-size=16384"
)

find_library(log-lib log)

target_link_libraries(tuner log)