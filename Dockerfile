FROM node:20-bullseye

ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

# Dependencies
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    unzip \
    wget \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Android SDK command line tools
RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools \
    && cd $ANDROID_SDK_ROOT/cmdline-tools \
    && wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O cmdline-tools.zip \
    && unzip cmdline-tools.zip \
    && mv cmdline-tools latest \
    && rm cmdline-tools.zip

# Accept licenses
RUN yes | sdkmanager --licenses

RUN sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"

WORKDIR /app

# Clone git repository
RUN git clone https://github.com/Ideogram-Avarus/open-tuner.git . 

RUN npm install

CMD ["npx", "expo", "prebuild"]