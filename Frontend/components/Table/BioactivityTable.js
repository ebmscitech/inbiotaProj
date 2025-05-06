import React from 'react';

const tableCellStyle = "px-4 py-2 border-b border-zinc-300 dark:border-zinc-700 text-black-600 dark:text-black-400";

const BioactivityTable = ({ bioactivity }) => {

    const parseReferences = (references) => {
        return references.split('"').filter(ref => ref.trim() !== '').map(ref => ref.trim());
    };

    const references = parseReferences(bioactivity.BA_ref);

    return (
        <div className="max-w-5xl ">
            <p className="text-lg sm:text-xl text-black-600 dark:text-black-400">
                Result for <strong>{bioactivity.BA_Name}</strong>
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
                            <td className={tableCellStyle}>Bioactivity Name</td>
                            <td className={tableCellStyle}>{bioactivity.BA_Name}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Details</td>
                            <td className={tableCellStyle}>{bioactivity.BA_Details}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>References</td>
                            <td className={tableCellStyle}>
                                {references.length > 0 ? (
                                    references.map((ref, index) => (
                                        <p key={index}>
                                            <a href={ref} target="_blank" rel="noopener noreferrer" className="text-primary2-700 hover:underline">
                                                {ref}
                                            </a>
                                        </p>
                                    ))
                                ) : (
                                    <p>No references listed.</p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Associated Plants</td>
                            <td className={tableCellStyle}>
                                {bioactivity.bioTan.length > 0 ? (
                                    bioactivity.bioTan.map((plant, index) => (
                                        <p key={index}>{plant.Plant_Name}</p>
                                    ))
                                ) : (
                                    <p>No associated plants listed.</p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Phytochemicals</td>
                            <td className={tableCellStyle}>
                                {bioactivity.bioPhy.length > 0 ? (
                                    bioactivity.bioPhy.map((phytochemical, index) => (
                                        <p key={index}>{phytochemical.Phytochemical}</p>
                                    ))
                                ) : (
                                    <p>No phytochemicals listed.</p>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BioactivityTable;