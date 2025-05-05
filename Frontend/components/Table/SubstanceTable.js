import React from 'react';

const tableCellStyle = "px-4 py-2 border-b border-zinc-300 dark:border-zinc-700 text-black-600 dark:text-black-400";

const SubstanceTable = ({ phytochemical }) => {
    return (
        <div className="max-w-5xl ">
            <p className="text-lg sm:text-xl text-black-600 dark:text-black-400">
                Result for <strong>{phytochemical.Phytochemical}</strong>
            </p>
            <hr className="my-2 border-zinc-300 dark:border-zinc-700" />
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className='text-lg sm:text-xl'>
                        <tr>
                            <th className={tableCellStyle}>Attribute</th>
                            <th className={tableCellStyle}>Details</th>
                        </tr>
                    </thead>
                    <tbody className='text-justify'>
                        <tr>
                            <td className={tableCellStyle}>Phytochemical</td>
                            <td className={tableCellStyle}>{phytochemical.Phytochemical}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Compound Class</td>
                            <td className={tableCellStyle}>{phytochemical.compoundClass}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Chemical Formula</td>
                            <td className={tableCellStyle}>{phytochemical.Chemical_Formula}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Molecular Mass</td>
                            <td className={tableCellStyle}>{phytochemical.Molecular_Mass}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>IUPAC Name</td>
                            <td className={tableCellStyle}>{phytochemical.IUPAC_Name}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Synonyms</td>
                            <td className={tableCellStyle}>{phytochemical.SynonymZ}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Associated Plants</td>
                            <td className={tableCellStyle}>
                                {phytochemical.phyTan.length > 0 ? (
                                    phytochemical.phyTan.map((plant, index) => (
                                        <p key={index}>{plant.Plant_Name}</p>
                                    ))
                                ) : (
                                    <p>No associated plants listed.</p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Associated Bioactivities</td>
                            <td className={tableCellStyle}>
                                {phytochemical.phyBio.length > 0 ? (
                                    phytochemical.phyBio.map((bioactivity, index) => (
                                        <p key={index}>{bioactivity.BA_Name}</p>
                                    ))
                                ) : (
                                    <p>No associated bioactivities listed.</p>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubstanceTable;