import React, { useEffect } from "react";
import "./index.scss";
import TagCloud from "TagCloud";

const TextSphere = () => {
    useEffect(() => {
        const container = '.tagcloud';
        const texts = [
            "Python",
            "PyTorch",
            "TensorFlow",
            "Transformers",
            "Classification",
            "CNNs",
            "LLMs",
            "GITHUB",
            "R",
            "MATLAB",
            "SIMULINK",
            "CSS",
            "JavaScript",
            "C++",
            "C#",
            "HTML",
            "React",
            "Machine Learning"
        ];

        const options = {
            radius: 300,
            maxSpeed: "fast",
            initSpeed: "fast",
            keep: true,
        };

        TagCloud(container, texts, options);

        return () => {
        };
    }, []);

    return (
        <div className="text-sphere">
            {/* span tag className must be "tagcloud" */}
            <span className="tagcloud"></span>
        </div>
    );
};

export default TextSphere;
