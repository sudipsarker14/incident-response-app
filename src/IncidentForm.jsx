import React, { useState, useRef } from 'react';
import axios from "axios";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { Await, useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from "primereact/toolbar";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressBar } from 'primereact/progressbar';

function IncidentForm() {
    const navigate = useNavigate();
    const toast = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
        const [isSubmitting, setIsSubmitting] = useState(false);
    const natureRef = useRef(null);
    const [incident, setIncident] = useState({
        incidentNo: '',
        dateOfIncident: '',
        reportingDate: '',
        natureOfIncident: '',
        placeOfIncident: '',
        briefDescription: '',
        actionsTaken: '',
        incidentStatus: '',
        completionDate: '',
        initiator: '',
        responsibleOfficer: '',
        impact: '',
        severity: '',
        stakeholders: '',
        actionsRequiredBy: '',
        remarks: '',
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset today to midnight 00:00:00
    const handleChange = (e) => {
        setIncident({
            ...incident,
            [e.target.name]: e.target.value
        })
    }
    const reject = () => {
        toast.current.show({
            severity: 'warn',
            summary: 'Rejected',
            detail: 'You have rejected',
            life: 3000
        });
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmitted(true);
        setIsSubmitting(true);
        if (
            !incident.dateOfIncident ||
            !incident.reportingDate ||
            !incident.natureOfIncident ||
            !incident.placeOfIncident ||
            !incident.briefDescription ||
            !incident.actionsTaken ||
            !incident.incidentStatus ||
            !incident.completionDate ||
            !incident.initiator ||
            !incident.responsibleOfficer ||
            !incident.impact ||
            !incident.severity ||
            !incident.stakeholders ||
            !incident.actionsRequiredBy ||
            !incident.remarks
        ) {
            toast.current.show({
                severity: 'error',
                summary: 'Submit Failed',
                detail: 'Please fill all the required fields.',
                life: 3000
            });
            setIsLoading(false);
            setIsSubmitting(false); 
            return;
        }
        else {

            try {


                const response = await axios.post('http://localhost:8082/addIncident', incident);
                console.log(response.data);
                // goToAboutPage();
                toast.current.show({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'Incident has been registered',
                    life: 3000,
                });

                setTimeout(() => {
                    navigate(`/table`);
                }, 3000);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
                
            }

        }
    }
    const nature_incidents = [
        { nature: 'IT Related Incident' },
        { nature: 'Manmade Incident' },
        { nature: 'Natural Calamities Incident' },
    ];
    const savarity_selection = [
        { nature: 'Low' },
        { nature: 'Medium' },
        { nature: 'High' },
        { nature: 'Extreme' },
    ];
    const incident_selection = [
        { nature: 'Open' },
        { nature: 'Close' },
    ];
    const actions_required_by = [
        { nature: 'Branch Manager' },
        { nature: 'PO Head' },
        { nature: 'GMO Head' },
    ];
    return (
        <div>
            {isLoading && (
                <div className="card flex justify-content-center"
                     style={{
            position: 'fixed', // so it overlays everything
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // optional semi-transparent background
            zIndex: 9999, // make sure it's on top
        }}>
                    <ProgressSpinner style={{ width: '60px', height: '60px' }} strokeWidth="4" />
                </div>
            )}
            <form>
                <Toolbar className="custom-toolbar" left={<h2> Incident Response Register </h2>} />
                <div class="formgrid grid">
                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-1">
                                <label htmlFor="dateOfIncident" className="font-bold block mb-2">
                                    Date Of Incident:
                                </label>
                                <Calendar
                                    id="dateOfIncident"
                                    value={incident.dateOfIncident ? new Date(incident.dateOfIncident) : null}
                                    dateFormat="dd/mm/yy"
                                    onChange={(e) => {
                                        const date = e.value;
                                        const day = date.getDate().toString().padStart(2, '0');
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        const year = date.getFullYear();

                                        setIncident({
                                            ...incident,
                                            dateOfIncident: `${year}-${month}-${day}`,
                                        });
                                    }}
                                    placeholder='Enter the date of Incident'
                                    showIcon
                                    maxDate={new Date()}
                                    className={submitted && !incident.dateOfIncident ? 'p-invalid' : ''} required
                                />
                                {submitted && !incident.dateOfIncident && (
                                    <Message severity="error" text="Date of Incident is required" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="reportingDate" className="font-bold block mb-2">
                                    Reporting Date:
                                </label>
                                <Calendar
                                    id="reportingDate"
                                    value={incident.reportingDate ? new Date(incident.reportingDate) : null}
                                    dateFormat="dd/mm/yy"
                                    onChange={(e) => {
                                        const date = e.value;
                                        const day = date.getDate().toString().padStart(2, '0');
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        const year = date.getFullYear();

                                        setIncident({
                                            ...incident,
                                            reportingDate: `${year}-${month}-${day}`,
                                        });
                                    }}
                                    placeholder='Enter the date of Reporting'
                                    showIcon
                                    maxDate={new Date()}
                                    minDate={incident.dateOfIncident ? new Date(incident.dateOfIncident) : null}
                                    disabled={!incident.dateOfIncident}
                                    className={submitted && !incident.reportingDate ? 'p-invalid' : ''} required
                                />
                                {submitted && !incident.reportingDate && (
                                    <Message severity="error" text="Reporting Date is required" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-3">
                                <label htmlFor="completionDate" className="font-bold block mb-2">
                                    Completion Date:
                                </label>
                                <Calendar
                                    id="completionDate"
                                    value={incident.completionDate ? new Date(incident.completionDate) : null}
                                    dateFormat="dd/mm/yy"
                                    onChange={(e) => {
                                        const date = e.value;
                                        const day = date.getDate().toString().padStart(2, '0');
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        const year = date.getFullYear();

                                        setIncident({
                                            ...incident,
                                            completionDate: `${year}-${month}-${day}`,
                                        });
                                    }}
                                    showIcon
                                    placeholder='Enter the date of Comple'
                                    maxDate={new Date()}
                                    minDate={incident.dateOfIncident ? new Date(incident.dateOfIncident) : null}
                                    disabled={!incident.dateOfIncident}
                                    className={submitted && !incident.completionDate ? 'p-invalid' : ''}
                                    required
                                />
                                {submitted && !incident.completionDate && (
                                    <Message severity="error" text="Completion Date is required" />
                                )}

                            </div>
                        </div>
                    </div>


                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-1">
                                <label htmlFor="natureOfIncident" className="font-bold block mb-2">Nature of Incident:</label>
                                <Dropdown value={incident.natureOfIncident || ''}

                                    onChange={(e) => setIncident({ ...incident, natureOfIncident: e.value })}
                                    options={nature_incidents} optionLabel="nature" optionValue="nature"
                                    checkmark={true} highlightOnSelect={false}
                                    className="w-full md:w-14rem ${submitted && !incident.natureOfIncident ? 'p-invalid' : ''}"
                                    required
                                />
                                {submitted && !incident.natureOfIncident && (
                                    <Message severity="error" text="Nature of Incident is required" />
                                )}

                                <small id="natureOfIncident-help">
                                    Select the nature of incident.
                                </small>
                            </div>
                        </div>
                    </div>

                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="incidentStatus" className="font-bold block mb-2">Incident Status:</label>
                                <Dropdown value={incident.incidentStatus || ''}
                                    onChange={(e) => setIncident({ ...incident, incidentStatus: e.value })}
                                    options={incident_selection} optionLabel="nature" optionValue="nature"
                                    className="w-full md:w-14rem ${submitted && !incident.incidentStatus ? 'p-invalid' : ''}"
                                    required
                                    checkmark={true} highlightOnSelect={false} />
                                {submitted && !incident.incidentStatus && (
                                    <Message severity="error" text="Incident Status is required" />
                                )}
                                <small id="incidentStatus-help">
                                    Select the incident status.
                                </small>
                            </div>
                        </div>
                    </div>


                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-3">
                                <label htmlFor="severity" className="font-bold block mb-2">Severity:</label>
                                <Dropdown value={incident.severity || ''}
                                    onChange={(e) => setIncident({ ...incident, severity: e.value })}
                                    options={savarity_selection} optionLabel="nature" optionValue="nature"
                                    className="w-full md:w-14rem ${submitted && !incident.severity ? 'p-invalid' : ''}"
                                    required
                                    checkmark={true} highlightOnSelect={false} />
                                {submitted && !incident.severity && (
                                    <Message severity="error" text="Severity is required" />
                                )}
                                <small id="severity-help">
                                    Select the severity of the incident.
                                </small>
                            </div>
                        </div>
                    </div>


                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="placeOfIncident" className="font-bold block mb-2">Place of Incident</label>
                                <InputText keyfilter="alpha"
                                    id="placeOfIncident"
                                    value={incident.placeOfIncident || ''}
                                    onChange={(e) => setIncident({ ...incident, placeOfIncident: e.target.value })}
                                    className={submitted && !incident.placeOfIncident ? 'p-invalid' : ''}
                                    required
                                />
                                {submitted && !incident.placeOfIncident && (
                                    <Message severity="error" text="Place of Incident is required" />
                                )}
                                <small id="placeOfIncident-help">
                                    Enter the place where the incident happened.
                                </small>
                            </div>
                        </div>
                    </div>

                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-1">
                                <label htmlFor="briefDescription" className="font-bold block mb-2">Brief Description:</label>
                                <InputTextarea autoResize keyfilter="alpha"
                                    id="briefDescription"
                                    value={incident.briefDescription || ''}
                                    onChange={(e) => setIncident({ ...incident, briefDescription: e.target.value })}
                                    className={submitted && !incident.briefDescription ? 'p-invalid' : ''}
                                    required
                                />
                                {submitted && !incident.briefDescription && (
                                    <Message severity="error" text="Description is required" />
                                )}

                                <small id="briefDescription-help">
                                    Enter the brief description of incident happened.
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="actionsTaken" className="font-bold block mb-2">Actions Taken:</label>
                                <InputTextarea autoResize keyfilter="alpha"
                                    id="actionsTaken"
                                    value={incident.actionsTaken || ''}
                                    onChange={(e) => setIncident({ ...incident, actionsTaken: e.target.value })}
                                    className={submitted && !incident.actionsTaken ? 'p-invalid' : ''}
                                    required
                                />
                                {submitted && !incident.actionsTaken && (
                                    <Message severity="error" text="Actions Taken is required" />
                                )}
                                <small id="actionsTaken-help">
                                    Enter the actions taken during incident.
                                </small>
                            </div>
                        </div>
                    </div>

                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="initiator" className="font-bold block mb-2">Initiator:</label>
                                <InputText keyfilter="alpha"
                                    id="initiator"
                                    value={incident.initiator || ''}
                                    onChange={(e) => setIncident({ ...incident, initiator: e.target.value })}
                                    className={submitted && !incident.initiator ? 'p-invalid' : ''}
                                    required
                                />
                                {submitted && !incident.initiator && (
                                    <Message severity="error" text="Initiator is required" />
                                )}
                                <small id="initiator-help">
                                    Enter the name of initiator.
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="responsibleOfficer" className="font-bold block mb-2">Responsible Officer:</label>
                                <InputText keyfilter="alpha"
                                    id="responsibleOfficer"
                                    value={incident.responsibleOfficer || ''}
                                    onChange={(e) => setIncident({ ...incident, responsibleOfficer: e.target.value })}
                                    className={submitted && !incident.responsibleOfficer ? 'p-invalid' : ''}
                                    required
                                />
                                {submitted && !incident.responsibleOfficer && (
                                    <Message severity="error" text="Responsible officer is required" />
                                )}
                                <small id="responsibleOfficer-help">
                                    Enter the name of Responsible Officer.
                                </small>
                            </div>
                        </div>
                    </div>


                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-3">
                                <label htmlFor="actionsRequiredBy" className="font-bold block mb-2">Actions Required By:</label>
                                <Dropdown value={incident.actionsRequiredBy || ''}
                                    onChange={(e) => setIncident({ ...incident, actionsRequiredBy: e.value })}
                                    options={actions_required_by} optionLabel="nature" optionValue="nature"
                                    className="w-full md:w-14rem ${submitted && !incident.actionsRequiredBy ? 'p-invalid' : ''}"
                                    checkmark={true} highlightOnSelect={false}
                                    required
                                />
                                {submitted && !incident.actionsRequiredBy && (
                                    <Message severity="error" text="Actions is required" />
                                )}
                                <small id="actionsRequiredBy-help">
                                    Select the actionsRequiredBy of the incident.
                                </small>
                            </div>
                        </div>
                    </div>

                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="impact" className="font-bold block mb-2">Impact:</label>
                                <InputText keyfilter="alpha"
                                    id="impact"
                                    value={incident.impact || ''}
                                    onChange={(e) => setIncident({ ...incident, impact: e.target.value })}
                                    className={submitted && !incident.impact ? 'p-invalid' : ''}
                                    required
                                />
                                {submitted && !incident.impact && (
                                    <Message severity="error" text="Impact is required" />
                                )}

                                <small id="impact-help">
                                    Enter the impact of the incident.
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="stakeholders" className="font-bold block mb-2">Stakeholders:</label>
                                <InputText keyfilter="alpha"
                                    id="stakeholders"
                                    value={incident.stakeholders || ''}
                                    onChange={(e) => setIncident({ ...incident, stakeholders: e.target.value })}
                                    className={submitted && !incident.stakeholders ? 'p-invalid' : ''}
                                    required
                                />
                                {submitted && !incident.stakeholders && (
                                    <Message severity="error" text="Stake holders are required" />
                                )}
                                <small id="impact-help">
                                    Enter the stakeholders name.
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="field col-12 md:col-4">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="remarks" className="font-bold block mb-2">Remarks:</label>
                                <InputTextarea autoResize keyfilter="alpha"
                                    id="remarks"
                                    value={incident.remarks || ''}
                                    onChange={(e) => setIncident({ ...incident, remarks: e.target.value })}
                                    className={submitted && !incident.remarks ? 'p-invalid' : ''}
                                    required
                                />
                                {submitted && !incident.remarks && (
                                    <Message severity="error" text="Remarks are required" />
                                )}
                                <small id="remarks-help">
                                    Enter the remarks of the incident.
                                </small>
                            </div>
                        </div>
                    </div>
                    <Toast ref={toast} />
                    <ConfirmDialog />
                    <div class="field col-12 md:col-12">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column">
                                <ButtonGroup>
                                    <Button type='submit' label="Save" onClick={handleSubmit} icon="pi pi-check"  disabled={isSubmitting}
                                    {...isSubmitting ? 'Submitting...' : 'Submit'}
                                    />
                                    <Button label="Reset" onClick={reject} icon="pi pi-times" />
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>

    );
}

export default IncidentForm;