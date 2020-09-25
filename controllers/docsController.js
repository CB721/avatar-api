const { sendRes } = require("../utils/index");

module.exports = {
    characters: (req, res) => {
        const docObj = {
            mainRoute: "/characters",
            requestType: "GET",
            subRoutes: {
                all: {
                    route: "/all",
                    params: {
                        element: {
                            description: "Option to get list of characters by element",
                            required: false,
                            dataType: "integer",
                            example: "/characters/all/?element=1"
                        }
                    },
                    description: "Get a list of all characters",
                    example: "/characters/all"
                },
                one: {
                    route: "/one",
                    params: {
                        id: {
                            description: "Get full character information by id",
                            required: true,
                            dataType: "integer",
                            example: "/characters/one/?id=1"
                        }
                    }
                }
            }
        }
        sendRes(res, docObj, 200);
    },
    elements: (req, res) => {
        const docObj = {
            mainRoute: "/elements",
            requestType: "GET",
            subRoutes: {
                all: {
                    route: "/all",
                    description: "Get a list of all elements",
                    example: "/elements/all"
                }
            }
        }
        sendRes(res, docObj, 200);
    },
    episodes: (req, res) => {
        const docObj = {
            mainRoute: "/episodes",
            requestType: "GET",
            subRoutes: {
                all: {
                    route: "/all",
                    params: {
                        page: {
                            description: "Get a list of 5 episodes by page.",
                            subDescription: "Last page is 23.",
                            required: true,
                            dataType: "integer",
                            example: "/episodes/all/3"
                        }
                    }
                },
                one: {
                    route: "/one",
                    params: {
                        id: {
                            description: "Get single episode with name, chapter number and season.",
                            required: true,
                            dataType: "integer",
                            example: "/episodes/one/?id=1"
                        }
                    }
                }
            }
        }
        sendRes(res, docObj, 200);
    },
    quotes: (req, res) => {
        const docObj = {
            mainRoute: "/quotes",
            requestType: "GET",
            subRoutes: {
                all: {
                    route: "/sample",
                    description: "Get a random quote",
                    example: "/quotes/sample",
                    headers: {
                        key: {
                            description: "Your API key",
                            subDescription: "A new quote will only be sent every minute.",
                            required: true,
                            dataType: "string"
                        }
                    },
                    params: {
                        charid: {
                            description: "Filter random quote by character id.",
                            required: false,
                            dataType: "integer",
                            example: "/quotes/sample/?charid=1"
                        },
                        episodeid: {
                            description: "Filter random quote by episode id.",
                            required: false,
                            dataType: "integer",
                            example: "/quotes/sample/?episodeid=1"
                        },
                        seasonid: {
                            description: "Filter random quote by season id.",
                            required: false,
                            dataType: "integer",
                            example: "/quotes/sample/?seasonid=1"
                        }
                    }
                }
            }
        }
        sendRes(res, docObj, 200);
    },
    seasons: (req, res) => {
        const docObj = {
            mainRoute: "/seasons",
            requestType: "GET",
            subRoutes: {
                all: {
                    route: "/all",
                    params: {
                        id: {
                            description: "Get one season with how many total episodes and which series it is in.",
                            required: true,
                            dataType: "integer",
                            example: "/seasons/all/?id=1"
                        }
                    }
                }
            }
        }
        sendRes(res, docObj, 200);
    },
    all: async (req, res) => {
        const docObj = [
            {
                mainRoute: "/characters",
                requestType: "GET",
                subRoutes: {
                    all: {
                        route: "/all",
                        params: {
                            element: {
                                description: "Option to get list of characters by element",
                                required: false,
                                dataType: "integer",
                                example: "/characters/all/?element=1"
                            }
                        },
                        description: "Get a list of all characters",
                        example: "/characters/all"
                    },
                    one: {
                        route: "/one",
                        params: {
                            id: {
                                description: "Get full character information by id",
                                required: true,
                                dataType: "integer",
                                example: "/characters/one/?id=1"
                            }
                        }
                    }
                }
            },
            {
                mainRoute: "/elements",
                requestType: "GET",
                subRoutes: {
                    all: {
                        route: "/all",
                        description: "Get a list of all elements",
                        example: "/elements/all"
                    }
                }
            },
            {
                mainRoute: "/episodes",
                requestType: "GET",
                subRoutes: {
                    all: {
                        route: "/all",
                        params: {
                            page: {
                                description: "Get a list of 5 episodes by page.",
                                subDescription: "Last page is 23.",
                                required: true,
                                dataType: "integer",
                                example: "/episodes/all/3"
                            }
                        }
                    },
                    one: {
                        route: "/one",
                        params: {
                            id: {
                                description: "Get single episode with name, chapter number and season.",
                                required: true,
                                dataType: "integer",
                                example: "/episodes/one/?id=1"
                            }
                        }
                    }
                }
            },
            {
                mainRoute: "/quotes",
                requestType: "GET",
                subRoutes: {
                    sample: {
                        route: "/sample",
                        description: "Get a random quote",
                        example: "/quotes/sample",
                        headers: {
                            key: {
                                description: "Your API key",
                                subDescription: "A new quote will only be sent every minute.",
                                required: true,
                                dataType: "string"
                            }
                        },
                        params: {
                            charid: {
                                description: "Filter random quote by character id.",
                                required: false,
                                dataType: "integer",
                                example: "/quotes/sample/?charid=1"
                            },
                            episodeid: {
                                description: "Filter random quote by episode id.",
                                required: false,
                                dataType: "integer",
                                example: "/quotes/sample/?episodeid=1"
                            },
                            seasonid: {
                                description: "Filter random quote by season id.",
                                required: false,
                                dataType: "integer",
                                example: "/quotes/sample/?seasonid=1"
                            }
                        }
                    }
                }
            },
            {
                mainRoute: "/seasons",
                requestType: "GET",
                subRoutes: {
                    all: {
                        route: "/all",
                        params: {
                            id: {
                                description: "Get one season with how many total episodes and which series it is in.",
                                required: true,
                                dataType: "integer",
                                example: "/seasons/all/?id=1"
                            }
                        }
                    }
                }
            }
        ]
        sendRes(res, docObj, 200);
    }
}