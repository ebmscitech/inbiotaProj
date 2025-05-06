import React from 'react';

const tableCellStyle = "px-4 py-2 border-b border-zinc-300 dark:border-zinc-700 text-black-600 dark:text-black-400";

const PlantTable = ({ plant }) => {

    const parseReferences = (references) => {
        return references.split('"').filter(ref => ref.trim() !== '').map(ref => ref.trim());
    };

    const references = parseReferences(plant.Reference);

    return (
        <div className="max-w-5xl ">
            <p className="text-lg sm:text-xl text-black-600 dark:text-black-400">
                Result for <strong>{plant.Plant_Name}</strong>
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
                            <td className={tableCellStyle}>Local Name</td>
                            <td className={tableCellStyle}>{plant.Local_Name}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>English Name</td>
                            <td className={tableCellStyle}>{plant.English_Name}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Kingdom</td>
                            <td className={tableCellStyle}>{plant.Kingdom}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Sub Kingdom</td>
                            <td className={tableCellStyle}>{plant.SubKingdom}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Infrakingdom</td>
                            <td className={tableCellStyle}>{plant.Infrakingdom}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Superdivision</td>
                            <td className={tableCellStyle}>{plant.Superdivision}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Class</td>
                            <td className={tableCellStyle}>{plant.Class}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Superorder</td>
                            <td className={tableCellStyle}>{plant.Superorder}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Order</td>
                            <td className={tableCellStyle}>{plant.Order}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Family</td>
                            <td className={tableCellStyle}>{plant.Family}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Genus</td>
                            <td className={tableCellStyle}>{plant.Genus}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Species</td>
                            <td className={tableCellStyle}>{plant.Species}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Synonym</td>
                            <td className={tableCellStyle}>{plant.Synonym}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Geographical Distribution</td>
                            <td className={tableCellStyle}>{plant.Geographical_Distribution}</td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Traditional Uses</td>
                            <td className={tableCellStyle}>{plant.Traditional_Uses}</td>
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
                            <td className={tableCellStyle}>Phytochemicals</td>
                            <td className={tableCellStyle}>
                                {plant.Phytochemicals.length > 0 ? (
                                    plant.Phytochemicals.map((phytochemical, index) => (
                                        <p key={index}>{phytochemical.Phytochemicals}</p>
                                    ))
                                ) : (
                                    <p>No phytochemicals listed.</p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className={tableCellStyle}>Bioactivities</td>
                            <td className={tableCellStyle}>
                                {plant.Bioactivities.length > 0 ? (
                                    plant.Bioactivities.map((bioactivity, index) => (
                                        <p key={index}>{bioactivity.BA_Name}</p>
                                    ))
                                ) : (
                                    <p>No bioactivities listed.</p>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlantTable;