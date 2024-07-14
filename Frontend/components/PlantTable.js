import React from 'react';

const tableCellStyle = "px-4 py-2 border-b border-zinc-300 dark:border-zinc-700 text-black-600 dark:text-black-400";

const PlantInfo = ({ part, phytochemicals }) => {
    return (
        <tr className='text-base sm:text-lg'>
            <td className={tableCellStyle}>{part}</td>
            <td className={tableCellStyle}>
                {phytochemicals.map((phytochemical, index) => (
                    <p key={index}>{phytochemical}</p>
                ))}
            </td>
        </tr>
    );
};

const PlantTable = () => {
    return (
        <div className="max-w-5xl p-4 px-0 sm:px-8">
            <p className="text-lg sm:text-xl text-black-600 dark:text-black-400">Result for <strong>Tulip: Phytochemical {">"} Chemical Formula</strong></p>
            <hr className="my-2 border-zinc-300 dark:border-zinc-700" />
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className='text-lg sm:text-xl'>
                        <tr>
                            <th className={tableCellStyle}>Parts of the plant</th>
                            <th className={tableCellStyle}>Isolated phytochemicals</th>
                        </tr>
                    </thead>
                    <tbody>
                        <PlantInfo
                            part="Stem bark"
                            phytochemicals={[
                                "Triterpenes and Sterols",
                                "N-alcohols (35%), octacosanol and triacontanol.",
                                "Spathoside, n-alkanes, linear aliphatic alcohols, sitosterol and their esters, beta-sitosterol-3-O-beta-D-glucopyranoside, oleanolic acid, pomolic acid, p-hydroxybenzoic acid and phenylethanol ester. 13β-acetoxyoleanolic acid, siaresinolic acid, 3β-acetoxy-12-hydroxyoleanan-28, 13-olide and oleanolic acid."
                            ]}
                        />
                        <PlantInfo
                            part="Leaves"
                            phytochemicals={[
                                "Spathosides A, B and C, Verminoside, 6'-O-trans-caffeoyl-loganic acid, Catalpol and Ajugol. Spathodol, Caffeic acid, Phenolic acid and Flavonoids."
                            ]}
                        />
                        <PlantInfo
                            part="Root peels"
                            phytochemicals={["Methyl p-hydroxybenzoate and p-hydroxybenzoic acid."]}
                        />
                        <PlantInfo
                            part="Fruits"
                            phytochemicals={["Polyphenols, Tannins, Saponins and Glucosides."]}
                        />
                        <PlantInfo
                            part="Flowers"
                            phytochemicals={[
                                "1,1-diethoxy-3-methyl-butane, N-hexadecanoic acid, 1,2-benzenedicarboxylic acid diisooctyl ester, and oleic acid [20]. Phytol, α-methyl Cinnamaldehyde, β-sitosterol-3-ac-etate, naringenin, catechin-3-O-α-rhamnopyranoside and 5, 6, 4' trihydroxy flavonol-7-O-α-rhamnopyranoside, Anthocyanin."
                            ]}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlantTable;
