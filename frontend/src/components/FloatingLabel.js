import React, {useState} from 'react';
import styled from "styled-components";

const FloatingLabel = props => {
    const [focus, setFocus] = useState(false);
    const {children, label, value} = props;

    const labelClass =
        focus || (value && value.length !== 0) ? "label label-float" : "label";

    return (<FloatWrapper>
            <div
                className="float-label"
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
            >
                {children}
                <label className={labelClass}>{label}</label>
            </div>
        </FloatWrapper>
    );
};

const FloatWrapper = styled.div`

.float-label {
  position: relative;
  margin-bottom: 12px;
}

.label {
  color: #929292;
  font-size: 1rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 12px;
  top: 12px;
  transition: 0.2s ease all;
}

.label-float {
  top: 6px;
  font-size: 10px;
    color: var(--mainBlack);

}
`;

export default FloatingLabel;