import debugResolve from "../../logger/debugResolve";

const debug = debugResolve("Resources measure");

const measureResources = () => {
    const paints = window.performance.getEntriesByType("resource");

    let output = "";

    paints.forEach(r => {
        output += `${r.name} ${r.duration} \n\n`;
    });

    debug("Load Resources", output);
};

export default measureResources;
