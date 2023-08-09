import debugResolve from "../../logger/debugResolve";

const debug = debugResolve("Paint measure");

const measurePaint = () => {
    const paints = window.performance.getEntriesByType("paint");

    let output = "";

    paints.forEach(r => {
        output += `${r.name} ${r.duration} \n\n`;
    });

    debug("Paint", output);
};

export default measurePaint;
