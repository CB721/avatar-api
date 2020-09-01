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
        return res.status(200).json(docObj);
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
        return res.status(200).json(docObj);
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
                            subDescription: "Last page is 13.",
                            required: true,
                            dataType: "integer",
                            example: "/episodes/all/?page=1"
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
        return res.status(200).json(docObj);
    },
    quotes: (req, res) => {
        const docObj = {
            mainRoute: "/quotes",
            requestType: "POST",
            subRoutes: {
                all: {
                    route: "/sample",
                    description: "Get a random quote",
                    example: "/quotes/sample",
                    body: {
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
        return res.status(200).json(docObj);
    },
    seasons: (req, res) => {
        const docObj = {
            mainRoute: "/seasons",
            requestType: "GET",
            subRoutes: {
                all: {
                    route: "/all",
                    params: {
                        page: {
                            description: "Get all seasons by title and id.",
                            required: true,
                            dataType: "integer",
                            example: "/seasons/all"
                        }
                    }
                },
                one: {
                    route: "/one",
                    params: {
                        id: {
                            description: "Get one season with how many total episodes and which series it is in.",
                            required: true,
                            dataType: "integer",
                            example: "/seasons/one/?id=1"
                        }
                    }
                }
            }
        }
        return res.status(200).json(docObj);
    },
    all: (req, res) => {
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
                                subDescription: "Last page is 13.",
                                required: true,
                                dataType: "integer",
                                example: "/episodes/all/?page=1"
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
                requestType: "POST",
                subRoutes: {
                    all: {
                        route: "/all",
                        description: "Get a random quote",
                        example: "/quotes/all",
                        body: {
                            key: {
                                description: "Your API key",
                                required: true,
                                dataType: "string"
                            }
                        },
                        params: {
                            charid: {
                                description: "Filter random quote by character id.",
                                required: false,
                                dataType: "integer",
                                example: "/quotes/all/?charid=1"
                            },
                            episodeid: {
                                description: "Filter random quote by episode id.",
                                required: false,
                                dataType: "integer",
                                example: "/quotes/all/?episodeid=1"
                            },
                            seasonid: {
                                description: "Filter random quote by season id.",
                                required: false,
                                dataType: "integer",
                                example: "/quotes/all/?seasonid=1"
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
                            page: {
                                description: "Get all seasons by title and id.",
                                required: true,
                                dataType: "integer",
                                example: "/seasons/all"
                            }
                        }
                    },
                    one: {
                        route: "/one",
                        params: {
                            id: {
                                description: "Get one season with how many total episodes and which series it is in.",
                                required: true,
                                dataType: "integer",
                                example: "/seasons/one/?id=1"
                            }
                        }
                    }
                }
            }
        ]
        return res.status(200).json(docObj);
    }
}