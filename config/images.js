const imageConfigs = {
    header: {
        formats: [
            {
                formatKey: "avif",
                mimeType: "image/avif"
            },
            {
                formatKey: "jpg",
                mimeType: "image/jpg"
            },
            {
                formatKey: "webp",
                mimeType: "image/webp"
            }
        ],
        sizes: [
            {
                width: 480,
                height: 306
            },
            {
                width: 640,
                height: 408
            },
            {
                width: 800,
                height: 510
            },
            {
                width: 1024,
                height: 653
            },
            {
                width: 1260,
                height: 804
            },
            {
                width: 1440,
                height: 919
            },
            {
                width: 1680,
                height: 1072
            }
        ],
        defaultFormat: {
            formatKey: "jpg",
            mimeType: "image/jpg"
        },
        defaultSize: {
            width: 1024,
            height: 653
        }
    },
    post: {
        formats: [
            {
                formatKey: "avif",
                mimeType: "image/avif"
            },
            {
                formatKey: "jpg",
                mimeType: "image/jpg"
            },
            {
                formatKey: "webp",
                mimeType: "image/webp"
            }
        ],
        sizes: [
            {
                width: 55,
                height: 55
            },
            {
                width: 350,
                height: 260,
                maintainRatio: true
            },
            {
                width: 540,
                height: 400,
                maintainRatio: true
            }
        ],
        defaultFormat: {
            formatKey: "jpg",
            mimeType: "image/jpg"
        },
        defaultSize: {
            width: 350,
            height: 260,
            maintainRatio: true
        }
    },
    equipmentType: {
        formats: [
            {
                formatKey: "avif",
                mimeType: "image/avif"
            },
            {
                formatKey: "jpg",
                mimeType: "image/jpg"
            },
            {
                formatKey: "webp",
                mimeType: "image/webp"
            }
        ],
        sizes: [
            {
                width: 55,
                height: 55
            },
            {
                width: 350,
                height: 260,
                maintainRatio: true
            }
        ],
        defaultFormat: {
            formatKey: "jpg",
            mimeType: "image/jpg"
        },
        defaultSize: {
            width: 350,
            height: 260,
            maintainRatio: true
        }
    },
    equipment: {
        formats: [
            {
                formatKey: "avif",
                mimeType: "image/avif"
            },
            {
                formatKey: "jpg",
                mimeType: "image/jpg"
            },
            {
                formatKey: "webp",
                mimeType: "image/webp"
            }
        ],
        sizes: [
            {
                width: 55,
                height: 55
            },
            {
                width: 350,
                height: 260,
                maintainRatio: true
            },
            {
                width: 540,
                height: 400,
                maintainRatio: true
            },
            {
                width: 945,
                height: 700,
                maintainRatio: true
            }
        ],
        defaultFormat: {
            formatKey: "jpg",
            mimeType: "image/jpg"
        },
        defaultSize: {
            width: 350,
            height: 260,
            maintainRatio: true
        }
    }
};

export default imageConfigs;
